# Claude Code configuration

Everything here is committed and shared, except `settings.local.json`.

| Path                           | Purpose                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| `../CLAUDE.md`                 | Entry point — imports `../AGENTS.md`, the shared agent guide   |
| `settings.json`                | Team permissions (allow / deny) and hooks                      |
| `settings.local.example.json`  | Copy to `settings.local.json` for personal overrides           |
| `hooks/safety-check.sh`        | PreToolUse: blocks force-push to main, `reset --hard`, `npm i`, `git add -A`, publish |
| `hooks/lint-edited-file.sh`    | PostToolUse: ESLints every edited JS/TS file, feeds errors back |
| `rules/*.md`                   | Always-loaded rules (`code-conventions` only for `src/**`)    |
| `skills/validate-and-commit/`  | `/validate-and-commit` — lint, typecheck, test, build, commit  |
| `../.mcp.json`                 | MCP servers: `next-devtools` (Next.js docs, dev-server errors, routes) and `react` (`@picsart/react-mcp` — team React guidelines; needs the `@picsart` GitLab registry in `~/.npmrc`) |

## Adding things

- **Rule** — `rules/<name>.md`, one topic, short. Add `paths:` frontmatter to
  load it only for matching files.
- **Skill** — `skills/<name>/SKILL.md` with `name` and `description`
  frontmatter. Add one only for a workflow the team has repeated at least
  three times.
- **Project fact every agent needs** — `../AGENTS.md`, not here.

Hooks need `jq` and `pnpm` on `PATH`.
