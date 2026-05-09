import { formsService } from './forms.service.js';
import type { MutationResolvers, QueryResolvers } from 'shared';

export const formsQuery: Pick<QueryResolvers, 'forms' | 'form'> = {
  forms: () => formsService.getAll(),
  form: (_parent, { id }) => formsService.getById(id),
};

export const formsMutation: Pick<MutationResolvers, 'createForm'> = {
  createForm: (_parent, args) => formsService.create(args),
};
