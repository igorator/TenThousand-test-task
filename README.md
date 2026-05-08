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

| Service        | URL                   |
| -------------- | --------------------- |
| React client   | http://localhost:3000 |
| GraphQL server | http://localhost:4000 |

Open **http://localhost:3000** in your browser.

---

## GraphQL Codegen

TypeScript types and typed GraphQL documents are auto-generated from the schema using [`@graphql-codegen/client-preset`](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client). The generated files (`client/src/app/gql/`) are committed to the repo, so codegen is **not required** to run the project.

Run it manually after changing the schema or any `.graphql` file:

```bash
npm run codegen
```

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
| `entities/forms/hooks/useFormBuilder/useFormBuilder.test.ts` | initial state, adding/removing questions, updating the form title |
| `entities/responses/hooks/useResponseBuilder/useResponseBuilder.test.ts` | initial state, text answers, checkbox toggle, validation error clearing, submit success/error status |
| `entities/responses/components/QuestionAnswerField/QuestionAnswerField.test.tsx` | renders correct input per question type (text, date, radio, checkbox), required indicator, error message, onTextChange callback |

---

## Notes

- `.env` files (`client/.env.dev`, `server/.env.dev`) are committed to the repo solely for reviewer convenience so the project runs out of the box. In a real project these would be gitignored and distributed via a secrets manager or shared securely.
