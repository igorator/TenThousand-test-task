import { renderHook, act } from '@testing-library/react';
import { useFormBuilder } from './useFormBuilder';
import { QuestionInputType } from 'shared';

const mockNavigate = vi.fn();
const mockCreateForm = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@/app/api', () => ({
  useCreateFormMutation: () => [mockCreateForm, { isLoading: false }],
}));

const textQuestion = {
  id: 'q-1',
  text: 'Your name?',
  type: QuestionInputType.Text,
  required: false,
  options: [],
};

const checkboxQuestion = {
  id: 'q-2',
  text: 'Pick options',
  type: QuestionInputType.Checkbox,
  required: false,
  options: [
    { id: 'o-1', value: 'Option A' },
    { id: 'o-2', value: 'Option B' },
  ],
};

describe('useFormBuilder', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockCreateForm.mockReset();
  });

  it('should call createForm with correct question inputs', async () => {
    mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
    const { result } = renderHook(() => useFormBuilder());

    await act(async () => {
      await result.current.submit('My Form', 'A description', [textQuestion]);
    });

    expect(mockCreateForm).toHaveBeenCalledWith({
      title: 'My Form',
      description: 'A description',
      questions: [
        { text: 'Your name?', type: QuestionInputType.Text, required: false, options: undefined },
      ],
    });
  });

  it('should serialize checkbox options as string array', async () => {
    mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
    const { result } = renderHook(() => useFormBuilder());

    await act(async () => {
      await result.current.submit('My Form', '', [checkboxQuestion]);
    });

    expect(mockCreateForm).toHaveBeenCalledWith(
      expect.objectContaining({
        questions: [expect.objectContaining({ options: ['Option A', 'Option B'] })],
      })
    );
  });

  it('should omit empty description', async () => {
    mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
    const { result } = renderHook(() => useFormBuilder());

    await act(async () => {
      await result.current.submit('My Form', '   ', [textQuestion]);
    });

    expect(mockCreateForm).toHaveBeenCalledWith(
      expect.objectContaining({ description: undefined })
    );
  });

  it('should navigate to home on success', async () => {
    mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
    const { result } = renderHook(() => useFormBuilder());

    await act(async () => {
      await result.current.submit('My Form', '', [textQuestion]);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should return true on success', async () => {
    mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
    const { result } = renderHook(() => useFormBuilder());

    let returnValue: boolean | undefined;
    await act(async () => {
      returnValue = await result.current.submit('My Form', '', [textQuestion]);
    });

    expect(returnValue).toBe(true);
  });

  it('should not navigate on failure', async () => {
    mockCreateForm.mockResolvedValue({ error: { message: 'Server error' } });
    const { result } = renderHook(() => useFormBuilder());

    await act(async () => {
      await result.current.submit('My Form', '', [textQuestion]);
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should return false on failure', async () => {
    mockCreateForm.mockResolvedValue({ error: { message: 'Server error' } });
    const { result } = renderHook(() => useFormBuilder());

    let returnValue: boolean | undefined;
    await act(async () => {
      returnValue = await result.current.submit('My Form', '', [textQuestion]);
    });

    expect(returnValue).toBe(false);
  });
});
