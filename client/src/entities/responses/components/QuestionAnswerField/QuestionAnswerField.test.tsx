import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionAnswerField } from './QuestionAnswerField';
import { QuestionInputType } from 'shared';
import type { GetFormQuery } from 'shared';

type Question = NonNullable<GetFormQuery['form']>['questions'][number];

const makeQuestion = (overrides: Partial<Question> = {}): Question => ({
  id: 'q-1',
  text: 'What is your name?',
  type: QuestionInputType.Text,
  required: false,
  options: null,
  ...overrides,
});

const defaultProps = {
  answer: undefined,
  onChange: vi.fn(),
};

describe('QuestionAnswerField', () => {
  it('renders question text', () => {
    render(<QuestionAnswerField {...defaultProps} question={makeQuestion()} />);

    expect(screen.getByText('What is your name?')).toBeTruthy();
  });

  it('shows required indicator when question is required', () => {
    render(<QuestionAnswerField {...defaultProps} question={makeQuestion({ required: true })} />);

    expect(screen.getByText('*')).toBeTruthy();
  });

  it('does not show required indicator when question is optional', () => {
    render(<QuestionAnswerField {...defaultProps} question={makeQuestion()} />);

    expect(screen.queryByText('*')).toBeNull();
  });

  it('renders text input for TEXT type', () => {
    render(<QuestionAnswerField {...defaultProps} question={makeQuestion()} />);

    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('renders date input for DATE type', () => {
    const { container } = render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion({ type: QuestionInputType.Date })}
      />
    );

    expect(container.querySelector('input[type="date"]')).toBeTruthy();
  });

  it('renders radio buttons for MULTIPLE_CHOICE type', () => {
    render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion({
          type: QuestionInputType.MultipleChoice,
          options: ['Option A', 'Option B'],
        })}
      />
    );

    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('renders checkboxes for CHECKBOX type', () => {
    render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion({
          type: QuestionInputType.Checkbox,
          options: ['Option A', 'Option B'],
        })}
        answer={[]}
      />
    );

    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('calls onChange with question id and value when text input changes', () => {
    const onChange = vi.fn();
    render(<QuestionAnswerField {...defaultProps} question={makeQuestion()} onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });

    expect(onChange).toHaveBeenCalledWith('q-1', 'John');
  });

  it('calls onChange with toggled array when checkbox is clicked', () => {
    const onChange = vi.fn();
    render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion({
          type: QuestionInputType.Checkbox,
          options: ['Option A', 'Option B'],
        })}
        answer={[]}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(onChange).toHaveBeenCalledWith('q-1', ['Option A']);
  });

  it('calls onChange with option removed when already-checked checkbox is clicked', () => {
    const onChange = vi.fn();
    render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion({
          type: QuestionInputType.Checkbox,
          options: ['Option A', 'Option B'],
        })}
        answer={['Option A']}
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    expect(onChange).toHaveBeenCalledWith('q-1', []);
  });

  it('shows error message when error is provided', () => {
    render(
      <QuestionAnswerField
        {...defaultProps}
        question={makeQuestion()}
        error="This field is required."
      />
    );

    expect(screen.getByText('This field is required.')).toBeTruthy();
  });
});
