import { formsMutation, formsQuery } from './forms/index.js';
import { responsesMutation, responsesQuery } from './responses/index.js';

export const resolvers = {
  Query: { ...formsQuery, ...responsesQuery },
  Mutation: { ...formsMutation, ...responsesMutation },
};
