import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FormBuilderPage } from './FormBuilderPage';
import { QuestionInputType } from 'shared';

const mockNavigate = vi.fn();
const mockCreateForm = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('@/app/api', () => ({
  useCreateFormMutation: vi.fn(),
}));

import { useCreateFormMutation } from '@/app/api';

const renderPage = () =>
  render(
    <MemoryRouter>
      <FormBuilderPage />
    </MemoryRouter>
  );

describe('FormBuilderPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockCreateForm.mockReset();
    vi.mocked(useCreateFormMutation).mockReturnValue([
      mockCreateForm,
      { isLoading: false },
    ] as unknown as ReturnType<typeof useCreateFormMutation>);
  });

  describe('rendering', () => {
    it('renders title input, description textarea, and action buttons', () => {
      renderPage();

      expect(screen.getByPlaceholderText('Form title *')).toBeTruthy();
      expect(screen.getByPlaceholderText('Description (optional)')).toBeTruthy();
      expect(screen.getByRole('button', { name: /save form/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeTruthy();
    });

    it('renders add-question buttons for each question type', () => {
      renderPage();

      expect(screen.getByRole('button', { name: /short text/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /multiple choice/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /checkboxes/i })).toBeTruthy();
      expect(screen.getByRole('button', { name: /date/i })).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('shows error when title is empty on save', async () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      expect(await screen.findByText('Title is required.')).toBeTruthy();
    });

    it('shows error when no questions are added on save', async () => {
      renderPage();

      fireEvent.change(screen.getByPlaceholderText('Form title *'), {
        target: { value: 'My Form' },
      });
      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      expect(await screen.findByText('Add at least one question.')).toBeTruthy();
    });

    it('does not call mutation when validation fails', () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      expect(mockCreateForm).not.toHaveBeenCalled();
    });

    it('shows question text error when question text is empty on save', async () => {
      renderPage();

      fireEvent.change(screen.getByPlaceholderText('Form title *'), {
        target: { value: 'My Form' },
      });
      fireEvent.click(screen.getByText('+ Short Text'));
      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      expect(await screen.findByText('Question text is required.')).toBeTruthy();
    });
  });

  describe('adding questions', () => {
    it('adds a text question when "+ Short Text" is clicked', () => {
      renderPage();

      fireEvent.click(screen.getByText('+ Short Text'));

      expect(screen.getByPlaceholderText('Question text')).toBeTruthy();
    });

    it('adds a multiple choice question with option inputs', () => {
      renderPage();

      fireEvent.click(screen.getByText('+ Multiple Choice'));

      expect(screen.getByPlaceholderText('Question text')).toBeTruthy();
      expect(screen.getAllByRole('button', { name: '✕' })).toBeTruthy();
    });

    it('removes a question when ✕ is clicked', () => {
      renderPage();

      fireEvent.click(screen.getByText('+ Short Text'));
      expect(screen.getByPlaceholderText('Question text')).toBeTruthy();

      fireEvent.click(screen.getByRole('button', { name: 'Remove question' }));
      expect(screen.queryByPlaceholderText('Question text')).toBeNull();
    });
  });

  describe('submit', () => {
    it('calls createForm with correct data on save', async () => {
      mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
      renderPage();

      fireEvent.change(screen.getByPlaceholderText('Form title *'), {
        target: { value: 'My Form' },
      });
      fireEvent.change(screen.getByPlaceholderText('Description (optional)'), {
        target: { value: 'A description' },
      });
      fireEvent.click(screen.getByText('+ Short Text'));
      fireEvent.change(screen.getByPlaceholderText('Question text'), {
        target: { value: 'What is your name?' },
      });
      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      await waitFor(() => {
        expect(mockCreateForm).toHaveBeenCalledWith({
          title: 'My Form',
          description: 'A description',
          questions: [
            {
              text: 'What is your name?',
              type: QuestionInputType.Text,
              required: false,
              options: undefined,
            },
          ],
        });
      });
    });

    it('navigates to home after successful save', async () => {
      mockCreateForm.mockResolvedValue({ data: { createForm: { id: 'form-1' } } });
      renderPage();

      fireEvent.change(screen.getByPlaceholderText('Form title *'), {
        target: { value: 'My Form' },
      });
      fireEvent.click(screen.getByText('+ Short Text'));
      fireEvent.change(screen.getByPlaceholderText('Question text'), {
        target: { value: 'What is your name?' },
      });
      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('shows form-level error when save fails', async () => {
      mockCreateForm.mockResolvedValue({ error: { message: 'Server error' } });
      renderPage();

      fireEvent.change(screen.getByPlaceholderText('Form title *'), {
        target: { value: 'My Form' },
      });
      fireEvent.click(screen.getByText('+ Short Text'));
      fireEvent.change(screen.getByPlaceholderText('Question text'), {
        target: { value: 'What is your name?' },
      });
      fireEvent.click(screen.getByRole('button', { name: /save form/i }));

      expect(await screen.findByText('Failed to save form. Please try again.')).toBeTruthy();
    });

    it('navigates to home when Cancel is clicked', () => {
      renderPage();

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
