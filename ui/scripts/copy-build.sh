if git diff --quiet HEAD -- package.json; then
  pnpm version patch --no-git-tag-version
fi
pnpm build
rm -f ../main/ui/*
cp -r dist/*.{js,css} ../main/ui/
