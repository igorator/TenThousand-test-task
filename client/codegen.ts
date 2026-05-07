import type { CodegenConfig } from '@graphql-codegen/cli';

const TYPED_DOCUMENT_STRING_DEF = `
class TypedDocumentString<TResult, TVariables> extends String {
  declare readonly __apiType?: TResult;
  declare readonly __variablesType?: TVariables;
  __meta__?: Record<string, string>;
  constructor(value: string, meta?: Record<string, string>) {
    super(value);
    this.__meta__ = meta;
  }
  override toString(): string { return super.toString(); }
}
`.trim();

const config: CodegenConfig = {
  schema: '../server/src/schema.graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/app/generated/api.gen.ts': {
      plugins: [
        { add: { content: TYPED_DOCUMENT_STRING_DEF } },
        'typescript',
        'typescript-operations',
        'typescript-rtk-query',
      ],
      config: {
        importBaseApiFrom: '../baseApi',
        exportHooks: true,
      },
    },
  },
};

export default config;
