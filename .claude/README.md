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
| `skills/validate-and-commit/`  | `/validate-and-commit` — lint, typecheck, build, commit         |
| `agents/seo-specialist.md`     | SEO agent: technical, local and multilingual SEO; preloads `seo-nextjs` and `seo-local-business` |
| `skills/seo-*/`                | SEO knowledge (`seo-nextjs`, `seo-local-business`) and tasks run in the agent: `/seo-setup` (analyze, fix, verify), `/seo-keyword-research`, `/seo-competitor-research`, `/seo-check [live]` |
| `agent-memory/seo-specialist/` | The SEO agent's committed memory: decisions, keyword map, competitors, audits |
| `../.mcp.json`                 | MCP servers: `next-devtools` (Next.js docs, dev-server errors, routes) and `react` (`@picsart/react-mcp` — team React guidelines; needs the `@picsart` GitLab registry in `~/.npmrc`) |

## Adding things

- **Rule** — `rules/<name>.md`, one topic, short. Add `paths:` frontmatter to
  load it only for matching files.
- **Skill** — `skills/<name>/SKILL.md` with `name` and `description`
  frontmatter. Add one only for a workflow the team has repeated at least
  three times.
- **Project fact every agent needs** — `../AGENTS.md`, not here.

Hooks need `jq` and `pnpm` on `PATH`.
