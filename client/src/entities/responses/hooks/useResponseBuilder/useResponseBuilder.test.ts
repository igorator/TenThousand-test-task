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

  it('should initialize with empty answers and idle submit status', () => {
    const { result } = renderHook(() => useResponseBuilder('form-1'));

    expect(result.current.answers).toEqual({});
    expect(result.current.validationErrors).toEqual({});
    expect(result.current.submitStatus).toBe('idle');
  });

  it('should set a text answer', () => {
    const { result } = renderHook(() => useResponseBuilder('form-1'));

    act(() => {
      result.current.setAnswer('q-1', 'My answer');
    });

    expect(result.current.answers['q-1']).toBe('My answer');
  });

  it('should toggle a checkbox option on and off', () => {
    const { result } = renderHook(() => useResponseBuilder('form-1'));

    act(() => {
      result.current.toggleCheckbox('q-1', 'Option A');
    });
    expect(result.current.answers['q-1']).toEqual(['Option A']);

    act(() => {
      result.current.toggleCheckbox('q-1', 'Option A');
    });
    expect(result.current.answers['q-1']).toEqual([]);
  });

  it('should clear validation error when answer is provided', () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion({ required: true })]));

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    act(() => {
      result.current.submit();
    });
    expect(result.current.validationErrors['q-1']).toBe('This field is required.');

    act(() => {
      result.current.setAnswer('q-1', 'filled');
    });
    expect(result.current.validationErrors['q-1']).toBeUndefined();
  });

  it('should set submitStatus to success on successful submit', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion()]));
    mockSubmitResponse.mockResolvedValue({ data: { submitResponse: true } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.submitStatus).toBe('success');
    expect(result.current.answers).toEqual({});
  });

  it('should set submitStatus to error on failed submit', async () => {
    vi.mocked(useGetFormQuery).mockReturnValue(mockQueryResult([makeQuestion()]));
    mockSubmitResponse.mockResolvedValue({ error: { message: 'Server error' } });

    const { result } = renderHook(() => useResponseBuilder('form-1'));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.submitStatus).toBe('error');
  });
});
