import { GraphQLError } from 'graphql';
import { formsStore } from '../../store/forms.store.js';
import { responsesStore } from '../../store/responses.store.js';
import type { MutationSubmitResponseArgs, Response } from 'shared';

export const responsesService = {
  getByFormId: (formId: string): Response[] => {
    if (!formsStore.exists(formId)) {
      throw new GraphQLError(`Form "${formId}" not found`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }
    return responsesStore.findByFormId(formId);
  },

  submit: ({ formId, answers }: MutationSubmitResponseArgs): Response => {
    const form = formsStore.findById(formId);
    if (!form) {
      throw new GraphQLError(`Form "${formId}" not found`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    const questionMap = Object.fromEntries(
      form.questions.map((question) => [question.id, question])
    );

    const response: Response = {
      id: crypto.randomUUID(),
      formId,
      answers: answers.map((answer) => {
        const question = questionMap[answer.questionId];
        if (!question) {
          throw new GraphQLError(`Question "${answer.questionId}" not found`, {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
        return { question, value: answer.value, values: answer.values };
      }),
      submittedAt: new Date().toISOString(),
    };

    return responsesStore.append(formId, response);
  },
};
