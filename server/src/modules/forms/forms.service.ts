import { formsStore } from '../../store/forms.store.js';
import { responsesStore } from '../../store/responses.store.js';
import type { Form, MutationCreateFormArgs, Question } from 'shared';

export const formsService = {
  getAll: (): Form[] => formsStore.findAll(),

  getById: (id: string): Form | null => formsStore.findById(id),

  create: ({ title, description, questions: inputs }: MutationCreateFormArgs): Form => {
    const questions: Question[] = (inputs ?? []).map((q) => ({
      id: crypto.randomUUID(),
      text: q.text,
      type: q.type,
      required: q.required ?? false,
      options: q.options,
    }));

    const form: Form = {
      id: crypto.randomUUID(),
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
    };

    formsStore.save(form);
    responsesStore.init(form.id);
    return form;
  },
};
