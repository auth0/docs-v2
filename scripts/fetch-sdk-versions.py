import sys, subprocess, json, datetime
import datetime as dt
from urllib.parse import urlsplit
from pprint import pp

sdks = json.load(sys.stdin)

for sdk in sdks.values():
    repo_url = next(link['url'] for link in sdk['links'] if link['label'] == 'GitHub')
    path = urlsplit(repo_url).path.strip('/')
    # Strip to owner/repo (in case of deeper GitHub link for monorepos)
    repo = '/'.join(path.split('/')[:2])

    flags = [
        '--exclude-drafts',
        '--exclude-pre-releases',
        '--json tagName,publishedAt'
    ]

    monorepo = 'monorepo' in sdk
    if monorepo:
        prefix = sdk['monorepo']['tagPrefix']
        strip = (sdk['monorepo']['stripPrefix'] == "true")
        jq = f'first(.[] | select(.tagName | startswith("{prefix}")))'
    else:
        flags.append('-L 1')
        jq = f'.[]' # Return the object instead of a list with the object
    flags.append(f'--jq \'{jq}\'')

    flags = ' '.join(flags)
    cmd = f'gh release list -R {repo} {flags}'
    releases_process = subprocess.run(cmd, shell=True, capture_output=True)

    if not releases_process.stdout:
        continue

    release_info = json.loads(releases_process.stdout)

    tag = release_info['tagName']
    sdk['badge'] = tag.replace(prefix, 'v') if (monorepo and strip) else tag

    # datetime doesn't support military time zones
    publishedAt = release_info['publishedAt'].strip('Z')
    date = dt.datetime.fromisoformat(publishedAt)
    sdk['date'] = f'{date.strftime("%b")} {date.day}, {date.year}'

print(json.dumps(sdks, indent=2))
