import { useNavigate } from 'react-router';
import { useCreateFormMutation } from '@/app/api';
import { type QuestionInput } from 'shared';
import { ROUTES } from '@/shared/config/routes';
import { needsOptions } from '../../components/FormBuilder/validation';
import type { DraftQuestion } from '../../components/FormBuilder/validation';

export type { DraftOption, DraftQuestion } from '../../components/FormBuilder/validation';

export function useFormBuilder() {
  const navigate = useNavigate();
  const [createForm, { isLoading }] = useCreateFormMutation();

  const submit = async (title: string, description: string, questions: DraftQuestion[]) => {
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
      return true;
    }
    return false;
  };

  return { submit, isLoading };
}
