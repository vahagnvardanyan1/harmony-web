# Never commit secrets or personal paths

## Never staged

- `.env*` files, `.claude/settings.local.json`, `.mcp.local.json`.
- API keys, tokens, OAuth client secrets, real account credentials. `.mcp.json`
  reads tokens from the environment (`${MY_TOKEN}`) — never paste a value into it.
- Absolute paths from a developer machine (`/Users/…`) in code, docs or config.

## How

- Stage files by name, never `git add .` / `git add -A`.
- Before committing, read `git diff --cached --stat` and open every dotfile or
  config file in it.
- A secret pasted into chat is already exposed: say so and suggest rotating it.
