# Never guess hosts, ids or config values

Look a value up at its source before writing it into code, config or CI —
never infer it from a similar-looking one.

- Package versions and Node engine ranges: `pnpm view <pkg> version engines`.
- Next.js APIs: the bundled docs in `node_modules/next/dist/docs/`, not memory.
- Environment URLs and ids: the `.env*` files or the deployment config.
- No speculative fallback URLs or hosts.
- Don't state what an API accepts or returns until a real call has shown it.
- If a value can't be found, ask — and say it is unverified.
