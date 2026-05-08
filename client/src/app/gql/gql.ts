/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  'fragment QuestionFields on Question {\n  id\n  text\n  type\n  required\n  options\n}\n\nfragment FormFields on Form {\n  id\n  title\n  description\n  createdAt\n  questions {\n    ...QuestionFields\n  }\n}\n\nquery GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    ...FormFields\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    ...FormFields\n  }\n}': typeof types.QuestionFieldsFragmentDoc;
  'fragment AnswerFields on Answer {\n  question {\n    id\n    text\n    type\n    required\n    options\n  }\n  value\n  values\n}\n\nfragment ResponseFields on Response {\n  id\n  formId\n  submittedAt\n  answers {\n    ...AnswerFields\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    ...ResponseFields\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    ...ResponseFields\n  }\n}': typeof types.AnswerFieldsFragmentDoc;
};
const documents: Documents = {
  'fragment QuestionFields on Question {\n  id\n  text\n  type\n  required\n  options\n}\n\nfragment FormFields on Form {\n  id\n  title\n  description\n  createdAt\n  questions {\n    ...QuestionFields\n  }\n}\n\nquery GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    ...FormFields\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    ...FormFields\n  }\n}':
    types.QuestionFieldsFragmentDoc,
  'fragment AnswerFields on Answer {\n  question {\n    id\n    text\n    type\n    required\n    options\n  }\n  value\n  values\n}\n\nfragment ResponseFields on Response {\n  id\n  formId\n  submittedAt\n  answers {\n    ...AnswerFields\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    ...ResponseFields\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    ...ResponseFields\n  }\n}':
    types.AnswerFieldsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment QuestionFields on Question {\n  id\n  text\n  type\n  required\n  options\n}\n\nfragment FormFields on Form {\n  id\n  title\n  description\n  createdAt\n  questions {\n    ...QuestionFields\n  }\n}\n\nquery GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    ...FormFields\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    ...FormFields\n  }\n}'
): (typeof documents)['fragment QuestionFields on Question {\n  id\n  text\n  type\n  required\n  options\n}\n\nfragment FormFields on Form {\n  id\n  title\n  description\n  createdAt\n  questions {\n    ...QuestionFields\n  }\n}\n\nquery GetForms {\n  forms {\n    id\n    title\n    description\n    createdAt\n  }\n}\n\nquery GetForm($id: ID!) {\n  form(id: $id) {\n    ...FormFields\n  }\n}\n\nmutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {\n  createForm(title: $title, description: $description, questions: $questions) {\n    ...FormFields\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment AnswerFields on Answer {\n  question {\n    id\n    text\n    type\n    required\n    options\n  }\n  value\n  values\n}\n\nfragment ResponseFields on Response {\n  id\n  formId\n  submittedAt\n  answers {\n    ...AnswerFields\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    ...ResponseFields\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    ...ResponseFields\n  }\n}'
): (typeof documents)['fragment AnswerFields on Answer {\n  question {\n    id\n    text\n    type\n    required\n    options\n  }\n  value\n  values\n}\n\nfragment ResponseFields on Response {\n  id\n  formId\n  submittedAt\n  answers {\n    ...AnswerFields\n  }\n}\n\nquery GetResponses($formId: ID!) {\n  responses(formId: $formId) {\n    ...ResponseFields\n  }\n}\n\nmutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {\n  submitResponse(formId: $formId, answers: $answers) {\n    ...ResponseFields\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
