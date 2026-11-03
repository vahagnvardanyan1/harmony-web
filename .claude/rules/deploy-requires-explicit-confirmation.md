# Deploys and shared-state changes require explicit confirmation

Never do any of these unless the user asked for it in the current conversation:

- `git push` of any kind, opening or merging a PR/MR.
- Pushing a release tag, running or retrying a deploy job, `vercel deploy`.
- Publishing a package.
- Rewriting history (`rebase`, `reset --hard`, `push --force`).

Reading pipelines, jobs and logs is always fine. When a task "naturally" ends at
one of the above, stop and ask.
