import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './index';

describe('DatePicker Component', () => {
  const mockOnChange = jest.fn();
  const props = {
    name: 'birthdate',
    value: '',
    onChange: mockOnChange,
    required: true,
    ariaInvalid: 'false',
    placeholder: 'Select date'
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder when no value', () => {
    render(<DatePicker {...props} />);
    expect(screen.getByText('Select date')).toBeInTheDocument();
  });

  it('renders selected date when value provided', () => {
    render(<DatePicker {...props} value="2025-08-10" />);
    expect(screen.getByText('10/08/2025')).toBeInTheDocument();
  });

  it('opens calendar on button click', () => {
    render(<DatePicker {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Janvier')).toBeInTheDocument();
  });

  it('calls onChange when date is selected', () => {
    render(<DatePicker {...props} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('15'));
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'birthdate',
        value: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
      }
    });
  });

  it('navigates between months', () => {
    render(<DatePicker {...props} />);
    fireEvent.click(screen.getByRole('button'));
    
    const monthSelects = screen.getAllByRole('combobox');
    const monthSelect = monthSelects[0]; // First select is for months
    fireEvent.change(monthSelect, { target: { value: '1' } });
    expect(screen.getByText('Février')).toBeInTheDocument();
  });

  it('applies required and aria-invalid attributes', () => {
    render(<DatePicker {...props} ariaInvalid="true" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-required', 'true');
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });
});
