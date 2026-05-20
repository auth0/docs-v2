npm version patch --no-git-tag-version
pnpm build
rm -f ../main/ui/*
cp -r dist/*.{js,css} ../main/ui/
