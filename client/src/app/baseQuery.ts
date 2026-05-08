import { GraphQLClient } from 'graphql-request';
import type { RequestDocument } from 'graphql-request';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

interface GraphqlBaseQueryArgs {
  url: string;
}

interface GraphqlRequestArgs {
  document: RequestDocument;
  variables?: Record<string, unknown> | void;
}

export const graphqlBaseQuery = ({
  url,
}: GraphqlBaseQueryArgs): BaseQueryFn<GraphqlRequestArgs> => {
  const client = new GraphQLClient(url);
  return async ({ document, variables }) => {
    try {
      const data = await client.request(document, variables as Record<string, unknown>);
      return { data };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return { error: { status: 'FETCH_ERROR', error: message } };
    }
  };
};
