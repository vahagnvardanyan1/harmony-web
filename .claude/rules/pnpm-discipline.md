# pnpm discipline

This repo uses **pnpm** (`packageManager` in `package.json`, `pnpm-lock.yaml`).
Never run `npm install` / `npm i` and never create a `package-lock.json` or `yarn.lock`.

| Task                        | Command                                     |
| --------------------------- | ------------------------------------------- |
| Install from the lockfile   | `pnpm install --frozen-lockfile`            |
| Add or change a dependency  | `pnpm add <pkg>@<version>` (`-D` for dev)   |
| Remove a dependency         | `pnpm remove <pkg>`                         |
| Run a script                | `pnpm <script>`                             |

- Change versions with `pnpm add`, never by hand-editing `package.json` — that
  drifts the manifest, lockfile and `node_modules` apart.
- Never `pnpm link` / `npm link` — publish a prerelease and install it instead.
- Look up versions with `pnpm view <pkg> version` before writing them anywhere;
  never guess.
- A dependency the code imports must be in this `package.json` — never rely on
  a transitive one.
