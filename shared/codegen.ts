import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['../client/src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        skipTypename: true,
      },
    },
    './src/generated/operations.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
        dedupeFragments: true,
        skipTypename: true,
        importSchemaTypesFrom: './src/generated/graphql',
      },
    },
  },
};

export default config;
