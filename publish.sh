#!/usr/bin/env bash
# Regenerate trades.json and push site files only.
set -euo pipefail
cd "$(dirname "$0")"
node gen-trades.js
git add index.html trades.json gen-trades.js publish.sh .gitignore README.md
if git ls-files | grep -Evq '^(index\.html|trades\.json|gen-trades\.js|publish\.sh|\.gitignore|README\.md|CNAME)$'; then echo "Unexpected tracked files, aborting"; git ls-files; exit 1; fi
git diff --cached --quiet && { echo "No changes"; exit 0; }
git commit -qm "Update trades $(date '+%Y-%m-%d %H:%M KST')" && git push -q origin main && echo "Pushed"
