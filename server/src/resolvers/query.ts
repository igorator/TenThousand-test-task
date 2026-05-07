import { GraphQLError } from 'graphql';
import { forms, responses } from '../store.js';
import type { Form, Response } from '../types.js';

export const Query = {
  forms: (): Form[] => Array.from(forms.values()),

  form: (_: unknown, { id }: { id: string }): Form | null => {
    return forms.get(id) ?? null;
  },

  responses: (_: unknown, { formId }: { formId: string }): Response[] => {
    if (!forms.has(formId)) {
      throw new GraphQLError(`Form with id "${formId}" not found`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return responses.get(formId) ?? [];
  },
};
