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
# Using Node
node --env-file=.env --import tsx src/server.ts

# Using tsx CLI
tsx --env-file=.env src/server.ts
```

---

### Watch Mode (Auto Reload)

```sh
npm run dev-watch
```

Or run directly:

```sh
# Using Node native watch
node --env-file=.env --watch --import tsx src/server.ts

# Using tsx watch
tsx watch --env-file=.env src/server.ts
```

---

## Production

### Build

```sh
npm run build
```

This compiles TypeScript to JavaScript using `tsc`.

---

### Start the server

```sh
node --env-file=.env dist/server.js
```

Notes:

* Ensure `.env` contains production-safe values.
* System environment variables take precedence over `.env` values.
* In production environments (Docker, CI/CD, hosting platforms), consider setting environment variables directly instead of relying on `.env` files.

---

## Environment Variables

Environment variables are loaded using Node’s `--env-file` flag. This ensures:

* Variables are available **before any module executes**
* No runtime ordering issues (common with `dotenv.config()` in ESM)
* Deterministic and production-aligned startup behavior

