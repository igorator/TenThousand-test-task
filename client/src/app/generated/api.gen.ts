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
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  question: Question;
  value?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Scalars['String']['output']>>;
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Form = {
  __typename?: 'Form';
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<QuestionInput>>;
  title: Scalars['String']['input'];
};


export type MutationSubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  required: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  required?: InputMaybe<Scalars['Boolean']['input']>;
  text: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT'
}

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  submittedAt: Scalars['String']['output'];
};

export type QuestionFieldsFragment = { __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null };

export type FormFieldsFragment = { __typename?: 'Form', id: string, title: string, description?: string | null, createdAt: string, questions: Array<{ __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null }> };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null, createdAt: string }> };

export type GetFormQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormQuery = { __typename?: 'Query', form?: { __typename?: 'Form', id: string, title: string, description?: string | null, createdAt: string, questions: Array<{ __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null }> } | null };

export type CreateFormMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<QuestionInput> | QuestionInput>;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: string, title: string, description?: string | null, createdAt: string, questions: Array<{ __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null }> } };

export type AnswerFieldsFragment = { __typename?: 'Answer', value?: string | null, values?: Array<string> | null, question: { __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null } };

export type ResponseFieldsFragment = { __typename?: 'Response', id: string, formId: string, submittedAt: string, answers: Array<{ __typename?: 'Answer', value?: string | null, values?: Array<string> | null, question: { __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null } }> };

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars['ID']['input'];
}>;


export type GetResponsesQuery = { __typename?: 'Query', responses: Array<{ __typename?: 'Response', id: string, formId: string, submittedAt: string, answers: Array<{ __typename?: 'Answer', value?: string | null, values?: Array<string> | null, question: { __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null } }> }> };

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars['ID']['input'];
  answers: Array<AnswerInput> | AnswerInput;
}>;


export type SubmitResponseMutation = { __typename?: 'Mutation', submitResponse: { __typename?: 'Response', id: string, formId: string, submittedAt: string, answers: Array<{ __typename?: 'Answer', value?: string | null, values?: Array<string> | null, question: { __typename?: 'Question', id: string, text: string, type: QuestionType, required: boolean, options?: Array<string> | null } }> } };

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

