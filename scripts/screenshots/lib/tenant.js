'use strict';

// Resolves placeholders in a manifest entry's dashboardUrl against the seeded demo tenant.
//
//   {region}            AUTH0_REGION env (e.g. us)
//   {tenant}            AUTH0_TENANT env (the tenant name, e.g. docs-screenshots)
//   {client:Acme Bot}   client_id of the application named "Acme Bot"
//   {api:Travel0 API}   id of the resource server named "Travel0 API"
//   {connection:Name}   id of the connection named Name
//   {org:Big Holdings}  id of the organization whose display name or name matches
//   {role:Name}         id of the role named Name
//   {action:Name}       id of the Action named Name
//   {user:email}        user_id of the user with that email
//
// Ids are looked up once per process through the Management API using client credentials from
// AUTH0_DOMAIN, AUTH0_CLIENT_ID and AUTH0_CLIENT_SECRET (the same M2M app Deploy CLI uses).

const env = (k, required = true) => {
  const v = process.env[k];
  if (!v && required) throw new Error(`Set ${k} in the environment (see scripts/screenshots/README.md)`);
  return v;
};

let tokenPromise;
async function token() {
  tokenPromise ??= (async () => {
    const domain = env('AUTH0_DOMAIN');
    const r = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: env('AUTH0_CLIENT_ID'),
        client_secret: env('AUTH0_CLIENT_SECRET'),
        audience: `https://${domain}/api/v2/`,
      }),
    });
    if (!r.ok) throw new Error(`Token request failed: ${r.status} ${await r.text()}`);
    return (await r.json()).access_token;
  })();
  return tokenPromise;
}

async function api(pathAndQuery) {
  const r = await fetch(`https://${env('AUTH0_DOMAIN')}/api/v2/${pathAndQuery}`, {
    headers: { authorization: `Bearer ${await token()}` },
  });
  if (!r.ok) throw new Error(`Management API ${pathAndQuery} failed: ${r.status} ${await r.text()}`);
  return r.json();
}

const lists = {};
async function listOnce(key, pathAndQuery, pick = (x) => x) {
  lists[key] ??= api(pathAndQuery).then(pick);
  return lists[key];
}

const lookups = {
  client: async (name) => (await listOnce('clients', 'clients?fields=client_id,name&include_fields=true&per_page=100')).find((c) => c.name === name)?.client_id,
  api: async (name) => (await listOnce('apis', 'resource-servers?per_page=100')).find((r) => r.name === name)?.id,
  connection: async (name) => (await listOnce('connections', 'connections?fields=id,name&include_fields=true&per_page=100')).find((c) => c.name === name)?.id,
  org: async (name) => (await listOnce('orgs', 'organizations?per_page=100')).find((o) => o.display_name === name || o.name === name)?.id,
  role: async (name) => (await listOnce('roles', 'roles?per_page=100')).find((r) => r.name === name)?.id,
  action: async (name) => (await listOnce('actions', 'actions/actions', (x) => x.actions || [])).find((a) => a.name === name)?.id,
  user: async (email) => (await api(`users-by-email?email=${encodeURIComponent(email)}`))[0]?.user_id,
};

const PLACEHOLDER_RE = /\{(region|tenant)\}|\{(client|api|connection|org|role|action|user):([^}]+)\}/g;

async function resolveUrl(template) {
  if (!template) throw new Error('manifest entry has no dashboardUrl');
  const parts = [];
  let last = 0;
  for (const m of template.matchAll(PLACEHOLDER_RE)) {
    parts.push(template.slice(last, m.index));
    if (m[1] === 'region') parts.push(env('AUTH0_REGION'));
    else if (m[1] === 'tenant') parts.push(env('AUTH0_TENANT'));
    else {
      const id = await lookups[m[2]](m[3]);
      if (!id) throw new Error(`No ${m[2]} named "${m[3]}" in the demo tenant; seed it with Deploy CLI first`);
      parts.push(id);
    }
    last = m.index + m[0].length;
  }
  parts.push(template.slice(last));
  return parts.join('');
}

module.exports = { resolveUrl, lookups, PLACEHOLDER_RE };
