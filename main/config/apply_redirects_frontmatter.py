#!/usr/bin/env python3
"""Migrate config/redirects.json into per-page `redirects:` frontmatter.

Run from inside main/.  Pass --apply to write files; default is a dry-run report.
"""
import json
import os
import re
import sys
from collections import Counter, OrderedDict, defaultdict

LOCALES = ["", "/fr-ca", "/ja-jp"]
MAX_HOPS = 12


def resolve(url):
    """Map a /docs/... URL to an on-disk .mdx file, or None."""
    p = url.split("#")[0].split("?")[0].lstrip("/")
    if not p:
        return None
    for cand in (p + ".mdx", os.path.join(p, "index.mdx")):
        if os.path.isfile(cand):
            return cand
    return None


def page_url(path):
    """Inverse of resolve(): file path -> canonical URL."""
    p = path[: -len(".mdx")]
    if p.endswith("/index"):
        p = p[: -len("/index")]
    return "/" + p


def expand(entries):
    """Expand :locale* rules into concrete per-locale pairs; drop other params."""
    pairs = []
    skipped_params = []
    for e in entries:
        src, dst = e["source"], e["destination"]
        if ":locale*" in src or ":locale*" in dst:
            for loc in LOCALES:
                pairs.append((src.replace("/:locale*", loc), dst.replace("/:locale*", loc)))
        elif re.search(r"/:[a-zA-Z]", src) or re.search(r"/:[a-zA-Z]", dst):
            skipped_params.append(e)
        else:
            pairs.append((src, dst))
    return pairs, skipped_params


def follow(dst, chain_map):
    """Follow redirect hops until the destination resolves to a file."""
    seen = set()
    cur = dst
    for _ in range(MAX_HOPS):
        f = resolve(cur)
        if f:
            return f, cur
        if cur in seen or cur not in chain_map:
            return None, cur
        seen.add(cur)
        cur = chain_map[cur]
    return None, cur


def build():
    entries = json.load(open("config/redirects.json"))
    pairs, skipped_params = expand(entries)
    chain_map = {}
    for s, d in pairs:
        chain_map.setdefault(s, d)

    by_file = defaultdict(OrderedDict)  # file -> ordered set of sources
    stats = Counter()
    unresolved = []

    for src, dst in pairs:
        if dst.startswith(("http://", "https://", "//")):
            stats["skip-external-dest"] += 1
            continue
        f, final = follow(dst, chain_map)
        if not f:
            stats["skip-dest-not-a-file"] += 1
            unresolved.append((src, dst, final))
            continue
        if src.rstrip("/") == page_url(f):
            stats["skip-self-redirect"] += 1
            continue
        if src in by_file[f]:
            stats["skip-duplicate"] += 1
            continue
        by_file[f][src] = None
        stats["mapped"] += 1
        if final != dst:
            stats["  (via chain)"] += 1
        if "*" in src:
            stats["  (wildcard source)"] += 1

    stats["skip-non-locale-path-param"] = len(skipped_params)
    return by_file, stats, unresolved


FM_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---[ \t]*\r?\n", re.S)


def inject(path, sources):
    text = open(path, encoding="utf-8").read()
    m = FM_RE.match(text)
    if not m:
        return None, "no-frontmatter"
    if re.search(r"^redirects\s*:", m.group(1), re.M):
        return None, "already-has-redirects"
    block = "redirects:\n" + "".join('  - "%s"\n' % s for s in sources)
    new_fm = m.group(1).rstrip("\n") + "\n" + block
    return text[: m.start()] + "---\n" + new_fm + "---\n" + text[m.end():], None


def main():
    apply = "--apply" in sys.argv
    by_file, stats, unresolved = build()

    print("=== entry accounting (after :locale* expansion) ===")
    for k, v in sorted(stats.items(), key=lambda kv: -kv[1]):
        print("%7d  %s" % (v, k))
    print("\nfiles to update: %d" % len(by_file))
    counts = sorted((len(v) for v in by_file.values()), reverse=True)
    print("redirects per file: max %d, median %d" % (counts[0], counts[len(counts) // 2]))
    print("locale files: %d" % sum(1 for f in by_file if "/fr-ca/" in f or "/ja-jp/" in f))

    problems = Counter()
    written = 0
    for f, srcs in sorted(by_file.items()):
        new, err = inject(f, list(srcs))
        if err:
            problems[err] += 1
            print("  !! %s: %s" % (f, err))
            continue
        if apply:
            open(f, "w", encoding="utf-8").write(new)
        written += 1
    print("\n%s %d files (%d problems)" % ("wrote" if apply else "would write", written, sum(problems.values())))

    with open("config/redirects-unmigrated.txt", "w", encoding="utf-8") as fh:
        for src, dst, final in sorted(unresolved):
            fh.write("%s\t%s\t%s\n" % (src, dst, final))
    print("unmigrated (dest has no file) listed in config/redirects-unmigrated.txt: %d" % len(unresolved))


if __name__ == "__main__":
    main()
