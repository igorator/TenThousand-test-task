import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './baseQuery';
import {
  GetFormsDocument,
  GetFormDocument,
  CreateFormDocument,
  GetResponsesDocument,
  SubmitResponseDocument,
} from 'shared';
import type {
  GetFormsQuery,
  GetFormQuery,
  GetFormQueryVariables,
  CreateFormMutation,
  CreateFormMutationVariables,
  GetResponsesQuery,
  GetResponsesQueryVariables,
  SubmitResponseMutation,
  SubmitResponseMutationVariables,
} from 'shared';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({ url: import.meta.env.VITE_GRAPHQL_URL }),
  tagTypes: ['Form', 'Response'],
  endpoints: (builder) => ({
    getForms: builder.query<GetFormsQuery, void>({
      query: () => ({ document: GetFormsDocument }),
      providesTags: ['Form'],
    }),
    getForm: builder.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables }),
      providesTags: ['Form'],
    }),
    createForm: builder.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables }),
      invalidatesTags: ['Form'],
    }),
    getResponses: builder.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables }),
      providesTags: ['Response'],
    }),
    submitResponse: builder.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables }),
      invalidatesTags: ['Response'],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useGetResponsesQuery,
  useSubmitResponseMutation,
} = api;
