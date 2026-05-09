import { useState } from 'react';
import { useGetFormQuery, useSubmitResponseMutation } from '@/app/api';
import { QuestionInputType, type AnswerInput } from 'shared';

type SubmitStatus = 'idle' | 'success' | 'error';

export function useResponseBuilder(formId: string) {
  const { data, isLoading, isError } = useGetFormQuery({ id: formId });
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const submit = async (answers: Record<string, string | string[]>) => {
    if (!data?.form) return;
    const answerInputs: AnswerInput[] = data.form.questions.map((question) => {
      const raw = answers[question.id];
      if (question.type === QuestionInputType.Checkbox) {
        return { questionId: question.id, values: (raw as string[]) ?? [] };
      }
      return { questionId: question.id, value: (raw as string) ?? '' };
    });

    const result = await submitResponse({ formId, answers: answerInputs });
    if ('data' in result && result.data) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
  };

  return {
    form: data?.form,
    isLoading,
    isError,
    isSubmitting,
    submitStatus,
    submit,
  };
}
