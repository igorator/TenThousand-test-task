export const ROUTES = {
  home: '/',
  formNew: '/forms/new',
  formFill: (id: string) => `/forms/${id}/fill`,
  formFillPattern: '/forms/:id/fill',
  formResponses: (id: string) => `/forms/${id}/responses`,
  formResponsesPattern: '/forms/:id/responses',
} as const;
