import { renderHook, act } from '@testing-library/react';
import { useResponseBuilder } from './useResponseBuilder';
import { QuestionInputType } from 'shared';
import type { Question } from 'shared';
import type { useGetFormQuery as UseGetFormQuery } from '@/app/api';

const mockSubmitResponse = vi.fn();

const makeQuestion = (overrides: Partial<Question> = {}): Question => ({
  id: 'q-1',
  text: 'Question?',
  type: QuestionInputType.Text,
  required: false,
  options: [],
  ...overrides,
});

const makeForm = (questions: Question[] = []) => ({
  form: { id: 'form-1', title: 'Test Form', description: '', createdAt: '', questions },
});

const mockQueryResult = (questions: Question[] = []) =>
  ({
    data: makeForm(questions),
    isLoading: false,
    isError: false,
  }) as unknown as ReturnType<typeof UseGetFormQuery>;

vi.mock('@/app/api', () => ({
  useGetFormQuery: vi.fn(),
  useSubmitResponseMutation: () => [mockSubmitResponse, { isLoading: false }],
}));

import { useGetFormQuery } from '@/app/api';

describe('useResponseBuilder', () => {
  beforeEach(() => {
    mockSubmitResponse.mockReset();
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult());
  });

  it('should initialize with idle submit status', () => {
    const { result } = renderHook(() => useResponseBuilder('form-1'));

    expect(result.current.submitStatus).toBe('idle');
  });

  it('should set submitStatus to success on successful submit', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion()]));
    mockSubmitResponse.mockResolvedValue({ data: { submitResponse: true } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit({ 'q-1': 'My answer' });
    });

    expect(result.current.submitStatus).toBe('success');
  });

  it('should set submitStatus to error on failed submit', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion()]));
    mockSubmitResponse.mockResolvedValue({ error: { message: 'Server error' } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit({ 'q-1': 'My answer' });
    });

    expect(result.current.submitStatus).toBe('error');
  });

  it('should serialize checkbox answers as values array', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(
      mockQueryResult([makeQuestion({ type: QuestionInputType.Checkbox })])
    );
    mockSubmitResponse.mockResolvedValue({ data: { submitResponse: true } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit({ 'q-1': ['Option A', 'Option B'] });
    });

    expect(mockSubmitResponse).toHaveBeenCalledWith({
      formId: 'form-1',
      answers: [{ questionId: 'q-1', values: ['Option A', 'Option B'] }],
    });
  });

  it('should serialize text answers as value string', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion()]));
    mockSubmitResponse.mockResolvedValue({ data: { submitResponse: true } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit({ 'q-1': 'hello' });
    });

    expect(mockSubmitResponse).toHaveBeenCalledWith({
      formId: 'form-1',
      answers: [{ questionId: 'q-1', value: 'hello' }],
    });
  });
});
