# Bump patch only if the version field hasn't been manually changed already
BASE_VER=$(git show HEAD:package.json | jq -r '.version')
CUR_VER=$(jq -r '.version' package.json)
if [ "$BASE_VER" = "$CUR_VER" ]; then
  pnpm version patch --no-git-tag-version
fi
pnpm build
rm -f ../main/ui/*
cp -r dist/*.{js,css} ../main/ui/
