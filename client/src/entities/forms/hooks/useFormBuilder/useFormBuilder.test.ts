import { renderHook, act } from '@testing-library/react';
import { useFormBuilder } from './useFormBuilder';
import { QuestionType } from 'shared';

const mockNavigate = vi.fn();
const mockCreateForm = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/app/api', () => ({
  useCreateFormMutation: () => [mockCreateForm, { isLoading: false }],
}));

describe('useFormBuilder', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockCreateForm.mockReset();
  });

  it('should initialize with empty form state', () => {
    const { result } = renderHook(() => useFormBuilder());

    expect(result.current.title).toBe('');
    expect(result.current.description).toBe('');
    expect(result.current.questions).toEqual([]);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it('should add a question', () => {
    const { result } = renderHook(() => useFormBuilder());

    act(() => {
      result.current.addQuestion(QuestionType.Text);
    });

    expect(result.current.questions).toHaveLength(1);
    expect(result.current.questions[0].type).toBe(QuestionType.Text);
  });

  it('should remove a question', () => {
    const { result } = renderHook(() => useFormBuilder());

    act(() => {
      result.current.addQuestion(QuestionType.Text);
    });

    const id = result.current.questions[0].id;

    act(() => {
      result.current.removeQuestion(id);
    });

    expect(result.current.questions).toHaveLength(0);
  });

  it('should update form title', () => {
    const { result } = renderHook(() => useFormBuilder());

    act(() => {
      result.current.setTitle('New Title');
    });

    expect(result.current.title).toBe('New Title');
  });
});
