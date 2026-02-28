#!/bin/bash

# Resolve conflicts and merge remaining PRs
git checkout main
git pull origin main

for pr in 26 27 28 29 30 31 32 33; do
  echo "=== Processing PR #$pr ==="
  
  # Checkout PR branch
  gh pr checkout $pr
  git fetch origin main
  
  # Merge main into PR branch
  git merge origin/main --no-edit 2>&1 | grep -q "CONFLICT" && has_conflict=true || has_conflict=false
  
  if [ "$has_conflict" = true ]; then
    echo "  Resolving conflicts..."
    # Resolve conflict by keeping both PR comments
    sed -i '' '/<<<<<<< HEAD/,/>>>>>>> origin\/main/c\
<!-- PR #'$((pr-1))' -->\
\
<!-- PR #'$pr' -->' README.md 2>/dev/null || \
    sed -i '/<<<<<<< HEAD/,/>>>>>>> origin\/main/c\
<!-- PR #'$((pr-1))' -->\
\
<!-- PR #'$pr' -->' README.md
    
    git add README.md
    git commit -m "resolve: merge conflicts with main"
    git push origin pr-improvement-$pr
  fi
  
  # Merge the PR
  echo "  Merging PR..."
  gh pr merge $pr --merge --delete-branch
  
  # Go back to main
  git checkout main
  git pull origin main
  echo ""
done

echo "✅ All PRs processed!"


