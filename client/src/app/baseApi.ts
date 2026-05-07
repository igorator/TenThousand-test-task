import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlBaseQuery } from './baseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: graphqlBaseQuery({ url: import.meta.env.VITE_GRAPHQL_URL }),
  endpoints: () => ({}),
});
