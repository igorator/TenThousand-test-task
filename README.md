# Google Forms Lite Clone | TenThousand Test task

## Prerequisites

- Node.js 20+
- npm 10+

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Set up environment variables**

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**3. Start the dev server**

```bash
npm run dev
```

| Service        | URL                   |
| -------------- | --------------------- |
| React client   | http://localhost:3000 |
| GraphQL server | http://localhost:4000 |

Open **http://localhost:3000** in your browser.

## GraphQL Codegen

TypeScript types and RTK Query hooks are auto-generated from the GraphQL schema. The generated file is committed to the repo, so codegen is **not required** to run the project.

Run it manually after changing the schema or any `.graphql` file:

```bash
npm run codegen
```
