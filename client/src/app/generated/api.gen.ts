/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { api } from '../baseApi';
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
export type AnswerInput = {
  questionId: string | number;
  value?: string | null | undefined;
  values?: Array<string> | null | undefined;
};

export type QuestionInput = {
  options?: Array<string> | null | undefined;
  required?: boolean | null | undefined;
  text: string;
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT'
}

export type QuestionFieldsFragment = { id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null };

export type FormFieldsFragment = { id: string, title: string, description: string | null, createdAt: string, questions: Array<{ id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null }> };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { forms: Array<{ id: string, title: string, description: string | null, createdAt: string }> };

export type GetFormQueryVariables = Exact<{
  id: string | number;
}>;


export type GetFormQuery = { form: { id: string, title: string, description: string | null, createdAt: string, questions: Array<{ id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null }> } | null };

export type CreateFormMutationVariables = Exact<{
  title: string;
  description?: string | null | undefined;
  questions?: Array<QuestionInput> | QuestionInput | null | undefined;
}>;


export type CreateFormMutation = { createForm: { id: string, title: string, description: string | null, createdAt: string, questions: Array<{ id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null }> } };

export type AnswerFieldsFragment = { value: string | null, values: Array<string> | null, question: { id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null } };

export type ResponseFieldsFragment = { id: string, formId: string, submittedAt: string, answers: Array<{ value: string | null, values: Array<string> | null, question: { id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null } }> };

export type GetResponsesQueryVariables = Exact<{
  formId: string | number;
}>;


export type GetResponsesQuery = { responses: Array<{ id: string, formId: string, submittedAt: string, answers: Array<{ value: string | null, values: Array<string> | null, question: { id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null } }> }> };

export type SubmitResponseMutationVariables = Exact<{
  formId: string | number;
  answers: Array<AnswerInput> | AnswerInput;
}>;


export type SubmitResponseMutation = { submitResponse: { id: string, formId: string, submittedAt: string, answers: Array<{ value: string | null, values: Array<string> | null, question: { id: string, text: string, type: QuestionType, required: boolean, options: Array<string> | null } }> } };

export const QuestionFieldsFragmentDoc = new TypedDocumentString(`
    fragment QuestionFields on Question {
  id
  text
  type
  required
  options
}
    `, {"fragmentName":"QuestionFields"});
export const FormFieldsFragmentDoc = new TypedDocumentString(`
    fragment FormFields on Form {
  id
  title
  description
  createdAt
  questions {
    ...QuestionFields
  }
}
    fragment QuestionFields on Question {
  id
  text
  type
  required
  options
}`, {"fragmentName":"FormFields"});
export const AnswerFieldsFragmentDoc = new TypedDocumentString(`
    fragment AnswerFields on Answer {
  question {
    id
    text
    type
    required
    options
  }
  value
  values
}
    `, {"fragmentName":"AnswerFields"});
export const ResponseFieldsFragmentDoc = new TypedDocumentString(`
    fragment ResponseFields on Response {
  id
  formId
  submittedAt
  answers {
    ...AnswerFields
  }
}
    fragment AnswerFields on Answer {
  question {
    id
    text
    type
    required
    options
  }
  value
  values
}`, {"fragmentName":"ResponseFields"});
export const GetFormsDocument = new TypedDocumentString(`
    query GetForms {
  forms {
    id
    title
    description
    createdAt
  }
}
    `);
export const GetFormDocument = new TypedDocumentString(`
    query GetForm($id: ID!) {
  form(id: $id) {
    ...FormFields
  }
}
    fragment QuestionFields on Question {
  id
  text
  type
  required
  options
}
fragment FormFields on Form {
  id
  title
  description
  createdAt
  questions {
    ...QuestionFields
  }
}`);
export const CreateFormDocument = new TypedDocumentString(`
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
  createForm(title: $title, description: $description, questions: $questions) {
    ...FormFields
  }
}
    fragment QuestionFields on Question {
  id
  text
  type
  required
  options
}
fragment FormFields on Form {
  id
  title
  description
  createdAt
  questions {
    ...QuestionFields
  }
}`);
export const GetResponsesDocument = new TypedDocumentString(`
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    ...ResponseFields
  }
}
    fragment AnswerFields on Answer {
  question {
    id
    text
    type
    required
    options
  }
  value
  values
}
fragment ResponseFields on Response {
  id
  formId
  submittedAt
  answers {
    ...AnswerFields
  }
}`);
export const SubmitResponseDocument = new TypedDocumentString(`
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
  submitResponse(formId: $formId, answers: $answers) {
    ...ResponseFields
  }
}
    fragment AnswerFields on Answer {
  question {
    id
    text
    type
    required
    options
  }
  value
  values
}
fragment ResponseFields on Response {
  id
  formId
  submittedAt
  answers {
    ...AnswerFields
  }
}`);

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables })
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables })
    }),
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables })
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetFormsQuery, useLazyGetFormsQuery, useGetFormQuery, useLazyGetFormQuery, useCreateFormMutation, useGetResponsesQuery, useLazyGetResponsesQuery, useSubmitResponseMutation } = injectedRtkApi;

