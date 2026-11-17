#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
repo="yukiwicaksono03/yukiwicaksono03.github.io"
remote_url="https://github.com/${repo}.git"

login="$(gh api user --jq .login)"
if [[ "$login" != "yukiwicaksono03" ]]; then
  echo "Please authenticate gh as yukiwicaksono03; current account: $login" >&2
  exit 1
fi

# Build before making any changes to GitHub.
npm run build
test -s out/index.html

if ! git diff --cached --quiet; then
  echo "There are already staged changes. Commit or unstage them before publishing." >&2
  exit 1
fi

if git remote get-url github-pages >/dev/null 2>&1; then
  if [[ "$(git remote get-url github-pages)" != "$remote_url" ]]; then
    echo "Remote github-pages already points elsewhere; stopping." >&2
    exit 1
  fi
else
  git remote add github-pages "$remote_url"
fi

git add next.config.ts .github/workflows/deploy-pages.yml README.md scripts/publish-pages.sh
if ! git diff --cached --quiet; then
  git commit -m "ci: configure GitHub Pages deployment"
fi

if ! gh repo view "$repo" --json nameWithOwner >/dev/null 2>&1; then
  gh repo create "$repo" --public --description "Yuki Wicaksono portfolio"
fi

# A pre-existing unrelated repository is protected by the non-force push.
git push github-pages HEAD:main

if gh api "repos/$repo/pages" >/dev/null 2>&1; then
  gh api --method PUT "repos/$repo/pages" -f build_type=workflow >/dev/null
else
  gh api --method POST "repos/$repo/pages" -f build_type=workflow >/dev/null
fi

gh workflow run deploy-pages.yml --repo "$repo" --ref main
echo "Deployment submitted. Check progress:"
echo "https://github.com/$repo/actions"
echo "Website after deployment succeeds: https://yukiwicaksono03.github.io/"
