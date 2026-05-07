import { api as generatedApi } from './generated/api.gen';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: ['Form', 'Response'],
  endpoints: {
    GetForms: { providesTags: ['Form'] },
    GetForm: { providesTags: ['Form'] },
    CreateForm: { invalidatesTags: ['Form'] },
    GetResponses: { providesTags: ['Response'] },
    SubmitResponse: { invalidatesTags: ['Response'] },
  },
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useGetResponsesQuery,
  useSubmitResponseMutation,
} = api;
