# Google Forms Lite Clone | TenThousand Test task

## Prerequisites

- Node.js 20+
- npm 10+

---

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Start the dev server**

```bash
npm run dev
```

GraphQL codegen runs automatically before the servers start, generating shared TypeScript types from the schema.

| Service        | URL                   |
| -------------- | --------------------- |
| React client   | http://localhost:3000 |
| GraphQL server | http://localhost:4000 |

Open **http://localhost:3000** in your browser.

---

## Running Tests

```bash
npm test
```

To run once without watch mode:

```bash
npm run test:ci
```

Tests live in `client/src/` next to the code they cover. The suite uses [Vitest](https://vitest.dev/) + `@testing-library/react`.

| File | What's tested |
| ---- | ------------- |
| `pages/FormBuilderPage/FormBuilderPage.test.tsx` | rendering, validation (title, questions, question text), adding/removing questions, submit with correct payload, navigation, error banner, cancel |
| `pages/FormFillerPage/FormFillerPage.test.tsx` | loading/error states, rendering, required-field validation, submit with text/checkbox answers, success page, error banner, retry |

---

## Notes

- `.env` files (`client/.env.dev`, `server/.env.dev`) are committed to the repo solely for reviewer convenience so the project runs out of the box. In a real project these would be gitignored and distributed via a secrets manager or shared securely.
