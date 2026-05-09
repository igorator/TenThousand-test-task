import type { Response } from 'shared';

const store = new Map<string, Response[]>();

export const responsesStore = {
  findByFormId: (formId: string): Response[] => store.get(formId) ?? [],
  init: (formId: string): void => {
    store.set(formId, []);
  },
  append: (formId: string, response: Response): Response => {
    const list = store.get(formId) ?? [];
    list.push(response);
    store.set(formId, list);
    return response;
  },
};
