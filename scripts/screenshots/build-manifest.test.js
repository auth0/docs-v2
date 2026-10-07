'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { dedupeIds } = require('./build-manifest');

test('dedupeIds: three or more entries sharing a base id get distinct suffixes', () => {
  const entries = [{ id: 'image2' }, { id: 'image2' }, { id: 'image2' }, { id: 'image2' }];
  dedupeIds(entries);
  const ids = entries.map((e) => e.id);
  assert.deepEqual(ids, ['image2', 'image2-2', 'image2-3', 'image2-4']);
  assert.equal(new Set(ids).size, ids.length, 'all ids must be unique');
});

test('dedupeIds: unrelated ids are left alone', () => {
  const entries = [{ id: 'a' }, { id: 'b' }, { id: 'a' }];
  dedupeIds(entries);
  assert.deepEqual(
    entries.map((e) => e.id),
    ['a', 'b', 'a-2'],
  );
});
