import { responsesService } from './responses.service.js';
import type { MutationResolvers, QueryResolvers } from 'shared';

export const responsesQuery: Pick<QueryResolvers, 'responses'> = {
  responses: (_parent, { formId }) => responsesService.getByFormId(formId),
};

export const responsesMutation: Pick<MutationResolvers, 'submitResponse'> = {
  submitResponse: (_parent, args) => responsesService.submit(args),
};
