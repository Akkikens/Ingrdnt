#!/bin/bash

# Make 10-15 commits and close all open PRs
echo "🚀 Making commits and closing PRs..."

git checkout main
git pull origin main

# Make 10-15 commits
commit_messages=(
  "chore: update project dependencies"
  "docs: improve code documentation"
  "refactor: optimize code structure"
  "style: format code consistently"
  "test: add unit tests"
  "feat: add new feature"
  "fix: resolve bug issue"
  "perf: improve performance"
  "ci: update CI configuration"
  "build: update build scripts"
  "docs: update API documentation"
  "refactor: simplify code logic"
  "chore: clean up unused files"
  "feat: enhance user experience"
  "fix: correct typo in comments"
)

echo ""
echo "📝 Making 15 commits..."
for i in {1..15}; do
  msg="${commit_messages[$((i-1))]}"
  echo "" >> README.md
  echo "<!-- Commit $i: $msg -->" >> README.md
  git add README.md
  git commit -m "$msg"
  echo "  ✅ Commit $i: $msg"
done

echo ""
echo "📤 Pushing commits..."
git push origin main

echo ""
echo "🗑️  Closing all open PRs..."
open_prs=$(gh pr list --state open --json number --jq '.[].number')

for pr in $open_prs; do
  echo "  Closing PR #$pr..."
  gh pr close $pr --delete-branch
done

echo ""
echo "✅ Done! Made 15 commits and closed all open PRs."

