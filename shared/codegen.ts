import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: ['../client/src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        {
          add: {
            content:
              'type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };\n',
          },
        },
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typed-document-node',
      ],
      config: {
        useTypeImports: true,
        dedupeFragments: true,
        skipTypename: true,
      },
    },
  },
};

export default config;
