'use strict';

// Tiny argv parser: --flag, --key=value, --key value, and positionals.
function parseArgs(argv, { booleans = [] } = {}) {
  const opts = {};
  const positional = [];
  const bools = new Set(booleans);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) {
      positional.push(a);
      continue;
    }
    const eq = a.indexOf('=');
    if (eq !== -1) {
      opts[a.slice(2, eq)] = a.slice(eq + 1);
      continue;
    }
    const key = a.slice(2);
    if (bools.has(key) || i + 1 >= argv.length || argv[i + 1].startsWith('--')) {
      opts[key] = true;
    } else {
      opts[key] = argv[++i];
    }
  }
  return { opts, positional };
}

module.exports = { parseArgs };
