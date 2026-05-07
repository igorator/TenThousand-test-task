import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useCreateFormMutation } from '@/app/api';
import { QuestionType } from '@/app/generated/api.gen';
import type { QuestionFieldsFragment, QuestionInput } from '@/app/generated/api.gen';
import { ROUTES } from '@/shared/config/routes';

export type DraftOption = { id: string; value: string };
export type DraftQuestion = Omit<QuestionFieldsFragment, 'options'> & { options: DraftOption[] };

const MIN_OPTIONS_COUNT = 2;

const needsOptions = (type: QuestionType) =>
  type === QuestionType.MultipleChoice || type === QuestionType.Checkbox;

const makeDefaultOptions = (): DraftOption[] => [
  { id: crypto.randomUUID(), value: 'Option 1' },
  { id: crypto.randomUUID(), value: 'Option 2' },
];

export function useFormBuilder() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<DraftQuestion[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addQuestion = useCallback((type: QuestionType) => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: '',
        type,
        required: false,
        options: needsOptions(type) ? makeDefaultOptions() : [],
      },
    ]);
  }, []);

  const updateQuestion = useCallback((id: string, patch: Partial<Omit<DraftQuestion, 'id'>>) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const updated = { ...question, ...patch };
        if ('type' in patch && needsOptions(patch.type!) && !updated.options.length) {
          updated.options = makeDefaultOptions();
        }
        return updated;
      })
    );
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  }, []);

  const addOption = useCallback((id: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const opts = question.options;
        return {
          ...question,
          options: [...opts, { id: crypto.randomUUID(), value: `Option ${opts.length + 1}` }],
        };
      })
    );
  }, []);

  const updateOption = useCallback((id: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const options = question.options.map((opt, i) => (i === index ? { ...opt, value } : opt));
        return { ...question, options };
      })
    );
  }, []);

  const removeOption = useCallback((id: string, index: number) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        return {
          ...question,
          options: question.options.filter((_, position) => position !== index),
        };
      })
    );
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (questions.length === 0) newErrors._questions = 'Add at least one question.';
    questions.forEach((question) => {
      if (!question.text.trim()) newErrors[question.id] = 'Question text is required.';
      if (needsOptions(question.type) && question.options.length < MIN_OPTIONS_COUNT)
        newErrors[`${question.id}-options`] = `At least ${MIN_OPTIONS_COUNT} options required.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [title, questions]);

  const submit = useCallback(async () => {
    if (!validate()) return;

    const questionInputs: QuestionInput[] = questions.map(({ text, type, required, options }) => ({
      text,
      type,
      required,
      options: needsOptions(type) ? options.map((opt) => opt.value) : undefined,
    }));

    const result = await createForm({
      title: title.trim(),
      description: description.trim() || undefined,
      questions: questionInputs,
    });

    if ('data' in result && result.data) {
      navigate(ROUTES.home);
    } else {
      setErrors((prev) => ({ ...prev, _form: 'Failed to save form. Please try again.' }));
    }
  }, [validate, title, description, questions, createForm, navigate]);

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    errors,
    isLoading,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    submit,
  };
}
