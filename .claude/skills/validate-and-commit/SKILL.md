---
name: validate-and-commit
description: Run lint, type-check and build, then commit only when everything passes. Use when the user says "commit", "commit this", or asks to finish a change with a commit.
allowed-tools: Bash, Read, Edit, Grep, Glob
argument-hint: "[commit message]"
---

# Validate and commit

Zero errors and zero warnings before every commit.

## 1. Check what will be committed

```bash
git status
git diff --stat
```

Decide which files belong to this change. Stage them **by name** — never
`git add -A` / `git add .`. Open every dotfile or config file in the diff and
make sure it holds no secrets (see `.claude/rules/never-commit-secrets.md`).

## 2. Lint

```bash
pnpm lint
```

On failure run `pnpm lint:fix`, then fix what remains by hand. Never add
`eslint-disable` to silence a rule.

## 3. Type-check

```bash
pnpm typecheck
```

Fix the types; never silence errors with `as any` or `@ts-ignore`.

## 4. Build

Only if no `pnpm dev` server is running (both write `.next`):

```bash
pnpm build
```

## 5. Commit

Conventional Commits with a scope; the body explains *why*:

```bash
git commit -m "$(cat <<'MSG'
feat(scope): short description

Why this change was needed.
MSG
)"
```

Never `--no-verify`. If a hook fails, fix the cause.

## 6. Report

Short hash, files changed, which checks ran and passed, any auto-fixes applied.
Do **not** push unless the user asked for it.
