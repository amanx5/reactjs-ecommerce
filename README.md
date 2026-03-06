# E-commerce Application

This project is a simple **e-commerce platform** originally built during the [SuperSimpleDev React course](https://courses.supersimple.dev/courses/react). It follows the tutorial content, but includes some enhancements:

- Fully typed using TypeScript (frontend & backend).
- Structured as a pnpm monorepo with separated `server/` and `ui/` packages.
- Deployed publicly on Render: https://ecommerce-pwwi.onrender.com/

The video series is available on YouTube:

- [SuperSimpleDev React Course (YouTube)](https://www.youtube.com/watch?v=TtPXvEcE11E&t=41018s)

## Overview

The workspace consists of two main packages:

- **server/** – a Node/Express backend providing REST APIs and data persistence.
- **ui/** – a React frontend built using Vite and TypeScript.

Both packages share common tooling and are managed with `pnpm` in a monorepo setup.

## Getting Started

Follow these steps to run the application locally:

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Start the server and client (from the repo root):
   ```bash
   pnpm dev
   ```
3. Navigate to `http://localhost:5173` (UI) and use the API at `http://localhost:3000`.

## License & Credits

Created as an educational project under the SuperSimpleDev React course.

---

Feel free to explore and adapt the code for learning purposes.