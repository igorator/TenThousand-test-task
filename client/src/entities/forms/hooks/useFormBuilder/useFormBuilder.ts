import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateFormMutation } from '@/app/api';
import type { QuestionInput } from 'shared';
import { QuestionInputType } from 'shared';
import { ROUTES } from '@/shared/config/routes';
import { needsOptions, validateFormDraft } from './validation';
import type { DraftQuestion } from './validation';

export type { DraftOption, DraftQuestion } from './validation';

const makeDefaultOptions = () => [
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

  const addQuestion = (type: QuestionInputType) => {
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
  };

  const updateQuestion = (id: string, patch: Partial<Omit<DraftQuestion, 'id'>>) => {
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
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const addOption = (id: string) => {
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
  };

  const updateOption = (id: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        const options = question.options.map((opt, i) => (i === index ? { ...opt, value } : opt));
        return { ...question, options };
      })
    );
  };

  const removeOption = (id: string, index: number) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id !== id) return question;
        return {
          ...question,
          options: question.options.filter((_, position) => position !== index),
        };
      })
    );
  };

  const validate = (): Record<string, string> => {
    const errors = validateFormDraft(title, questions);
    setErrors(errors);
    return errors;
  };

  const submit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0].replace(/-options$/, '');
      requestAnimationFrame(() => {
        document
          .getElementById(`field-${firstKey}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

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
  };

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
