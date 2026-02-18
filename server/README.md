# E-Commerce Backend

## Requirements

* **Node.js v20+**
  This server relies on Node’s built-in `--env-file` flag to load custom environment variables before application code executes.

---

## Development

### Start the Server 

```sh
npm run dev
```

Or run directly:

```sh
# Using Node native watch
node --env-file=.env.dev --watch --import tsx src/server.ts

# Using tsx watch
tsx watch --env-file=.env.dev src/server.ts
```

---

## Production

### Build

```sh
npm run build
```
> [!NOTE]
> It uses "tsup" to compile the source files. "tsc" is not used as the source files contains path-aliases and extension-less imports and "tsc" doesn't convert them to relative imports. Node only understands relative imports, so non-relative imports will break during runtime code. A bundler like "tsup" rewrites non relative imports present in source code to relative imports in compiled code.
---

### Start the server

```sh
npm run start
```

Or run directly:
```sh
node --env-file=.env.prod dist/server/server.js
```

> In production environments (Docker, CI/CD, hosting platforms), consider setting environment variables directly instead of relying on `.env` files.

---
