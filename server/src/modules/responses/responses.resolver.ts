import { responsesService } from './responses.service.js';
import type { MutationResolvers, QueryResolvers } from 'shared';

export const responsesQuery: Pick<QueryResolvers, 'responses'> = {
  responses: (_, { formId }) => responsesService.getByFormId(formId),
};

export const responsesMutation: Pick<MutationResolvers, 'submitResponse'> = {
  submitResponse: (_, args) => responsesService.submit(args),
};
