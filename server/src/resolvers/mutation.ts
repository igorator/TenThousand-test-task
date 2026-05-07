import { GraphQLError } from 'graphql';
import { forms, responses } from '../store.js';
import type { Form, Question, Response, QuestionInput, AnswerInput } from '../types.js';

export const Mutation = {
  createForm: (
    _: unknown,
    {
      title,
      description,
      questions: questionInputs,
    }: { title: string; description?: string; questions?: QuestionInput[] }
  ): Form => {
    const id = crypto.randomUUID();
    const questions: Question[] = (questionInputs ?? []).map((question) => ({
      id: crypto.randomUUID(),
      text: question.text,
      type: question.type,
      required: question.required ?? false,
      options: question.options,
    }));

    const form: Form = {
      id,
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
    };

    forms.set(id, form);
    responses.set(id, []);
    return form;
  },

  submitResponse: (
    _: unknown,
    { formId, answers }: { formId: string; answers: AnswerInput[] }
  ): Response => {
    if (!forms.has(formId)) {
      throw new GraphQLError(`Form with id "${formId}" not found`, {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    const form = forms.get(formId)!;
    const questionMap = Object.fromEntries(form.questions.map((q) => [q.id, q]));

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

    const formResponses = responses.get(formId) ?? [];
    formResponses.push(response);
    responses.set(formId, formResponses);

    return response;
  },
};
