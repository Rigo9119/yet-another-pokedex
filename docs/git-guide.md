# Git Guide

## `git merge` vs `git rebase`

Both commands integrate changes from one branch into another, but they do it differently.

### `git merge`

Takes two branch tips and creates a **new merge commit** that combines them.

```
main:    A---B---C
                  \
feature:           M  (merge commit)
                  /
feat:    A---B---D---E
```

- Preserves the full history of both branches
- Non-destructive — existing commits are never changed
- History can look messy with many merge commits

### `git rebase`

**Replays** your commits on top of another branch, rewriting history.

```
Before:
main:    A---B---C
feat:    A---B---D---E

After rebase feat onto main:
main:    A---B---C
feat:             D'--E'  (new commits, same changes)
```

- Creates a **linear history** — cleaner, easier to read with `git log`
- **Rewrites commits** (D and E become D' and E' — new SHA hashes)
- Dangerous on shared/public branches because it changes history others may depend on

### When to use which

| Situation | Use |
|---|---|
| Integrating a finished feature into `main` | `merge` |
| Keeping your feature branch up to date with `main` | `rebase` |
| Public/shared branches | `merge` (never rebase) |
| Cleaning up local commit history | `rebase -i` (interactive) |

---

## Using `git rebase`

### Basic Rebase Workflow

The most common use case: your feature branch is behind `main` and you want to update it.

**1. Make sure your working tree is clean**
```bash
git status  # should show nothing to commit
```

**2. Update main**
```bash
git checkout main
git pull
```

**3. Switch to your feature branch**
```bash
git checkout feature
```

**4. Rebase onto main**
```bash
git rebase main
```

### Handling Conflicts

If a conflict occurs, git **pauses** and tells you which file has a conflict.

1. Open the file, resolve the conflict manually
2. Stage the resolved file:
```bash
git add <file>
```
3. Continue the rebase:
```bash
git rebase --continue
```

To **abort** and go back to how things were:
```bash
git rebase --abort
```

### Interactive Rebase (`-i`)

Lets you **edit, squash, reorder, or drop** your own commits before sharing them.

```bash
git rebase -i main
```

This opens an editor listing your commits:

```
pick E Add login form
pick F Fix typo
pick G Add validation
```

Change `pick` to:
- `squash` (or `s`) — combine with previous commit
- `reword` (or `r`) — edit the commit message
- `drop` (or `d`) — delete the commit entirely

### After Rebasing — Pushing

Since rebase rewrites history, a normal `git push` will be rejected if you've already pushed the branch. Use:

```bash
git push --force-with-lease
```

`--force-with-lease` is safer than `--force` — it checks that nobody else pushed to the branch since you last fetched.

---

## `git commit --amend`

Lets you **modify the most recent commit** — either its message, its content, or both.

### Common Use Cases

**Fix the last commit message**
```bash
git commit --amend -m "Better commit message"
```

**Add a forgotten file to the last commit**
```bash
git add forgotten-file.ts
git commit --amend --no-edit  # --no-edit keeps the same message
```

**Change both content and message**
```bash
git add some-file.ts
git commit --amend -m "New message with the extra file included"
```

### Amending an older commit with interactive rebase

`--amend` only touches the **last commit**. For older commits, use interactive rebase:

```bash
git rebase -i main
```

Change `pick` to `edit` on the target commit. Git will pause there and let you run:

```bash
git add <file>
git commit --amend
git rebase --continue
```

### Pushing after amend

Since `--amend` rewrites history, force push if already pushed:

```bash
git push --force-with-lease
```

> Only amend commits that **haven't been pushed**, or that are on a **branch only you are using**.

---

## The Golden Rule

> **Never rebase or amend commits that exist outside your local repository.**

If someone else has pulled your branch and you rewrite its history, you'll cause conflicts for everyone else.
