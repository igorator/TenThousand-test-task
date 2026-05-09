import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { FormFillerPage } from './FormFillerPage';
import { QuestionInputType } from 'shared';

const mockSubmit = vi.fn();

vi.mock('@/app/api', () => ({
  useGetFormQuery: vi.fn(),
  useSubmitResponseMutation: vi.fn(),
}));

import { useGetFormQuery, useSubmitResponseMutation } from '@/app/api';

const textQuestion = {
  id: 'q-text',
  text: 'Your name?',
  type: QuestionInputType.Text,
  required: true,
  options: null,
};

const checkboxQuestion = {
  id: 'q-check',
  text: 'Pick options',
  type: QuestionInputType.Checkbox,
  required: false,
  options: ['Option A', 'Option B'],
};

const mockForm = {
  id: 'form-1',
  title: 'Test Form',
  description: 'A test form',
  createdAt: '2024-01-01',
  questions: [textQuestion, checkboxQuestion],
};

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/forms/form-1/fill']}>
      <Routes>
        <Route path="/forms/:id/fill" element={<FormFillerPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('FormFillerPage', () => {
  beforeEach(() => {
    mockSubmit.mockReset();
    vi.mocked(useSubmitResponseMutation).mockReturnValue([
      mockSubmit,
      { isLoading: false },
    ] as unknown as ReturnType<typeof useSubmitResponseMutation>);
    vi.mocked(useGetFormQuery).mockReturnValue({
      data: { form: mockForm },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetFormQuery>);
  });

  describe('loading and error states', () => {
    it('shows spinner while loading', () => {
      vi.mocked(useGetFormQuery).mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as unknown as ReturnType<typeof useGetFormQuery>);

      renderPage();

      expect(screen.getByRole('status')).toBeTruthy();
      expect(screen.queryByText('Test Form')).toBeNull();
    });

    it('shows error message when form is not found', () => {
      vi.mocked(useGetFormQuery).mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as unknown as ReturnType<typeof useGetFormQuery>);

      renderPage();

      expect(screen.getByText('Form not found.')).toBeTruthy();
    });
  });

  describe('rendering', () => {
    it('renders form title, description, and all questions', () => {
      renderPage();

      expect(screen.getByText('Test Form')).toBeTruthy();
      expect(screen.getByText('A test form')).toBeTruthy();
      expect(screen.getByText('Your name?')).toBeTruthy();
      expect(screen.getByText('Pick options')).toBeTruthy();
    });

    it('renders text input, checkboxes, and submit button', () => {
      renderPage();

      expect(screen.getByRole('textbox')).toBeTruthy();
      expect(screen.getAllByRole('checkbox')).toHaveLength(2);
      expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
    });

    it('shows empty state when form has no questions', () => {
      vi.mocked(useGetFormQuery).mockReturnValue({
        data: { form: { ...mockForm, questions: [] } },
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useGetFormQuery>);

      renderPage();

      expect(screen.getByText('This form has no questions.')).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('shows validation error when required field is empty on submit', async () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.findByText('This field is required.')).toBeTruthy();
    });

    it('does not call the submit mutation when required fields are empty', () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it('clears validation error when the field is filled', async () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
      expect(await screen.findByText('This field is required.')).toBeTruthy();

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });

      expect(screen.queryByText('This field is required.')).toBeNull();
    });
  });

  describe('submit', () => {
    it('calls mutation with correct text answer', async () => {
      mockSubmit.mockResolvedValue({ data: { submitResponse: { id: 'r-1' } } });
      renderPage();

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          formId: 'form-1',
          answers: [
            { questionId: 'q-text', value: 'John' },
            { questionId: 'q-check', values: [] },
          ],
        });
      });
    });

    it('calls mutation with correct checkbox answers', async () => {
      mockSubmit.mockResolvedValue({ data: { submitResponse: { id: 'r-1' } } });
      vi.mocked(useGetFormQuery).mockReturnValue({
        data: {
          form: {
            ...mockForm,
            questions: [{ ...textQuestion, required: false }, checkboxQuestion],
          },
        },
        isLoading: false,
        isError: false,
      } as unknown as ReturnType<typeof useGetFormQuery>);

      renderPage();

      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          formId: 'form-1',
          answers: expect.arrayContaining([{ questionId: 'q-check', values: ['Option A'] }]),
        });
      });
    });

    it('shows success page after successful submit', async () => {
      mockSubmit.mockResolvedValue({ data: { submitResponse: { id: 'r-1' } } });
      renderPage();

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.findByText('Response submitted!')).toBeTruthy();
    });

    it('shows error banner when submit fails', async () => {
      mockSubmit.mockResolvedValue({ error: { message: 'Server error' } });
      renderPage();

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.findByText('Something went wrong. Please try again.')).toBeTruthy();
    });

    it('keeps the form visible after a failed submit so the user can retry', async () => {
      mockSubmit.mockResolvedValue({ error: { message: 'Server error' } });
      renderPage();

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));

      await screen.findByText('Something went wrong. Please try again.');
      expect(screen.getByRole('button', { name: /submit/i })).toBeTruthy();
    });
  });
});
