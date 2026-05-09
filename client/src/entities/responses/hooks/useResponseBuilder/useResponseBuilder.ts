import { useState } from 'react';
import { useGetFormQuery, useSubmitResponseMutation } from '@/app/api';
import type { AnswerInput } from 'shared';
import { needsMultipleValues, validateAnswers } from './validation';

type SubmitStatus = 'idle' | 'success' | 'error';

export function useResponseBuilder(formId: string) {
  const { data, isLoading, isError } = useGetFormQuery({ id: formId });
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const toggleCheckbox = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) ?? [];
      const next = current.includes(option)
        ? current.filter((value) => value !== option)
        : [...current, option];
      return { ...prev, [questionId]: next };
    });
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const questions = data?.form?.questions;
    if (!questions) return {};
    const errors = validateAnswers(questions, answers);
    setValidationErrors(errors);
    return errors;
  };

  const submit = async () => {
    if (!data?.form) return;
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      requestAnimationFrame(() => {
        document
          .getElementById(`field-${firstKey}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    setSubmitStatus('idle');
    const answerInputs: AnswerInput[] = data.form.questions.map((question) => {
      const raw = answers[question.id];
      if (needsMultipleValues(question.type)) {
        return { questionId: question.id, values: (raw as string[]) ?? [] };
      }
      return { questionId: question.id, value: (raw as string) ?? '' };
    });

    const result = await submitResponse({ formId, answers: answerInputs });
    if ('data' in result && result.data) {
      setSubmitStatus('success');
      setAnswers({});
    } else {
      setSubmitStatus('error');
    }
  };

  return {
    form: data?.form,
    isLoading,
    isError,
    answers,
    validationErrors,
    isSubmitting,
    submitStatus,
    setAnswer,
    toggleCheckbox,
    submit,
  };
}
