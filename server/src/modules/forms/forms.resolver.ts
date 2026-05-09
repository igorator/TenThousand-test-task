import { formsService } from './forms.service.js';
import type { MutationResolvers, QueryResolvers } from 'shared';

export const formsQuery: Pick<QueryResolvers, 'forms' | 'form'> = {
  forms: () => formsService.getAll(),
  form: (_, { id }) => formsService.getById(id),
};

export const formsMutation: Pick<MutationResolvers, 'createForm'> = {
  createForm: (_, args) => formsService.create(args),
};
