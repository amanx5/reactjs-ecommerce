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
npm run prod
```

Or run directly:
```sh
node --env-file=.env dist/server.js
```

> In production environments (Docker, CI/CD, hosting platforms), consider setting environment variables directly instead of relying on `.env` files.

---
