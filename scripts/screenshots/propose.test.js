'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const propose = require('./propose');

const FIX = path.join(__dirname, '__fixtures__', 'refs');
const OLD = '/docs/images/cdy7uua7fh8z/abc/def/old-shot.png';

function tempRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'propose-'));
  fs.cpSync(FIX, dir, { recursive: true });
  // a tiny real PNG (1x1) so readImage accepts it
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync(path.join(dir, 'repo/main', OLD), png);
  fs.mkdirSync(path.join(dir, 'repo/scripts/data'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'repo/scripts/data/dashboard-link-map.json'),
    JSON.stringify([
      { old: 'https://manage.auth0.com/#/applications', new: 'https://manage.auth0.com/dashboard/*/applications', changeType: 'x' },
      { old: 'https://manage.auth0.com/#/apis', new: 'https://manage.auth0.com/dashboard/*/apis', changeType: 'x' },
    ]),
  );
  return dir;
}

const sampleProposal = {
  screen: 'applications',
  subscreen: 'settings',
  dashboardUrl: '/dashboard/{region}/{tenant}/applications/{client:Acme Bot}/settings',
  steps: [{ action: 'click', selector: "role=tab[name='Settings']", value: '' }, { action: 'wait', selector: '', value: '500' }],
  crop: "role=region[name='Application settings']",
  mask: ["text=Client Secret"],
  newPath: '/docs/images/dashboard/applications/settings/dashboard-applications-settings-light.png',
  altText: 'Auth0 Dashboard Applications Settings tab',
  confidence: 0.8,
  rationale: 'The old screenshot shows the settings form.',
  needsHuman: null,
};

function fakeClient(output) {
  const calls = [];
  return {
    calls,
    messages: {
      parse: async (req) => {
        calls.push(req);
        return { stop_reason: 'end_turn', parsed_output: output, usage: { input_tokens: 10, output_tokens: 5, cache_read_input_tokens: 0 } };
      },
    },
  };
}

const fakeSchemas = { Proposal: {}, Verification: {} };
const toFormat = (schema) => ({ type: 'json_schema', schema });

test('buildProposeRequest carries the image, the page excerpt and the route catalog', () => {
  const root = path.join(tempRepo(), 'repo');
  const entries = JSON.parse(fs.readFileSync(path.join(root, '..', 'manifest.json'), 'utf8'));
  const req = propose.buildProposeRequest(entries[0], { root, catalog: propose.loadCatalog(root) });
  assert.equal(req.error, undefined);
  assert.equal(req.messages[0].content[0].type, 'image');
  assert.equal(req.messages[0].content[0].source.media_type, 'image/png');
  const text = req.messages[0].content[1].text;
  assert.match(text, /Docs page: Page/);
  assert.match(text, /old-shot\.png/);
  assert.match(req.system[1].text, /dashboard\/\*\/applications/);
  assert.deepEqual(req.system[1].cache_control, { type: 'ephemeral' });
});

test('buildProposeRequest reports a missing image instead of throwing', () => {
  const root = path.join(tempRepo(), 'repo');
  const entries = JSON.parse(fs.readFileSync(path.join(root, '..', 'manifest.json'), 'utf8'));
  const req = propose.buildProposeRequest(entries[2], { root, catalog: { routes: [], notes: '' } });
  assert.match(req.error, /missing/);
});

test('applyProposal fills only empty fields and converts steps', () => {
  const entry = { newPath: '/docs/images/dashboard/unsorted/x-light.png', proposed: true, altText: 'keep me', steps: [], mask: [], crop: '', dashboardUrl: '' };
  const changed = propose.applyProposal(entry, sampleProposal);
  assert.deepEqual(changed.sort(), ['crop', 'dashboardUrl', 'mask', 'newPath', 'steps'].sort());
  assert.equal(entry.altText, 'keep me');
  assert.deepEqual(entry.steps, [{ click: "role=tab[name='Settings']" }, { wait: 500 }]);
  assert.equal(entry.proposed, true, 'newPath stays proposed until a human confirms');
  assert.equal(entry.proposedBy, 'vision');
  const confirmed = { newPath: '/docs/images/ciba/x-light.png', proposed: false, dashboardUrl: 'keep', crop: 'keep' };
  assert.deepEqual(propose.applyProposal(confirmed, sampleProposal).sort(), ['altText', 'mask', 'steps']);
  assert.equal(confirmed.newPath, '/docs/images/ciba/x-light.png', 'confirmed newPath untouched');
});

test('propose run writes proposals, marks catalog membership, and --apply fills fields', async () => {
  const dir = tempRepo();
  const manifestFile = path.join(dir, 'manifest.json');
  // make the first entry pending with empty capture fields so it is selected
  const m = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  m[0].status = 'pending';
  m[0].dashboardUrl = '';
  m[0].crop = '';
  fs.writeFileSync(manifestFile, JSON.stringify(m));
  const client = fakeClient(sampleProposal);
  const logs = [];
  const code = await propose.run([`--root=${path.join(dir, 'repo')}`, `--manifest=${manifestFile}`, '--apply'], { client, schemas: fakeSchemas, toFormat, log: (l) => logs.push(l) });
  assert.equal(code, 0);
  assert.equal(client.calls.length, 1, 'only the pending entry with an image is sent');
  assert.equal(client.calls[0].model, 'claude-opus-5');
  assert.equal(client.calls[0].output_config.effort, 'medium');
  const out = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  assert.equal(out[0].proposal.confidence, 0.8);
  assert.equal(out[0].proposal.inCatalog, true);
  assert.equal(out[0].dashboardUrl, sampleProposal.dashboardUrl);
  assert.equal(out[0].crop, sampleProposal.crop);
  assert.ok(logs.some((l) => /1 ok, 1 skipped/.test(l)), logs.join('\n'));
});

test('verify run compares old and new images and records the verdict', async () => {
  const dir = tempRepo();
  const manifestFile = path.join(dir, 'manifest.json');
  const m = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const newAbs = path.join(dir, 'repo/main', m[0].newPath);
  fs.mkdirSync(path.dirname(newAbs), { recursive: true });
  fs.copyFileSync(path.join(dir, 'repo/main', OLD), newAbs);
  const client = fakeClient({ sameScreen: true, sameState: false, score: 0.6, issues: ['Advanced section collapsed'], summary: 'Same screen, different state' });
  const code = await propose.run(['verify', `--root=${path.join(dir, 'repo')}`, `--manifest=${manifestFile}`, '--id=old-shot'], { client, schemas: fakeSchemas, toFormat, log: () => {} });
  assert.equal(code, 0);
  assert.equal(client.calls[0].messages[0].content.filter((b) => b.type === 'image').length, 2);
  const out = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  assert.equal(out[0].verification.score, 0.6);
  assert.deepEqual(out[0].verification.issues, ['Advanced section collapsed']);
});

test('a refusal or unparseable response is recorded as an error, not applied', async () => {
  const dir = tempRepo();
  const manifestFile = path.join(dir, 'manifest.json');
  const m = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  m[0].status = 'pending';
  m[0].dashboardUrl = '';
  fs.writeFileSync(manifestFile, JSON.stringify(m));
  const client = { messages: { parse: async () => ({ stop_reason: 'refusal', stop_details: { explanation: 'nope' }, parsed_output: null }) } };
  const code = await propose.run([`--root=${path.join(dir, 'repo')}`, `--manifest=${manifestFile}`, '--apply'], { client, schemas: fakeSchemas, toFormat, log: () => {} });
  assert.equal(code, 1);
  const out = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  assert.match(out[0].proposal.error, /declined/);
  assert.equal(out[0].dashboardUrl, '');
});
