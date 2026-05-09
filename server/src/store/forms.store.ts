import type { Form } from 'shared';

const store = new Map<string, Form>();

export const formsStore = {
  findAll: (): Form[] => Array.from(store.values()),
  findById: (id: string): Form | null => store.get(id) ?? null,
  exists: (id: string): boolean => store.has(id),
  save: (form: Form): Form => {
    store.set(form.id, form);
    return form;
  },
};
