import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './index';

describe('Dropdown Component', () => {
  const mockOnChange = jest.fn();
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' }
  ];
  
  const simpleOptions = ['Option A', 'Option B', 'Option C'];
  
  const props = {
    name: 'test-dropdown',
    options,
    value: '',
    onChange: mockOnChange,
    required: true,
    ariaInvalid: 'false',
    placeholder: 'Select option'
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with placeholder when no value', () => {
    render(<Dropdown {...props} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders selected option when value provided', () => {
    render(<Dropdown {...props} value="opt2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('calls onChange when option is selected', () => {
    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'test-dropdown',
        value: 'opt1'
      }
    });
  });

  it('works with simple string options', () => {
    render(<Dropdown {...props} options={simpleOptions} value="Option B" />);
    expect(screen.getByText('Option B')).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option C'));
    expect(mockOnChange).toHaveBeenCalledWith({
      target: {
        name: 'test-dropdown',
        value: 'Option C'
      }
    });
  });

  it('applies required and aria-invalid attributes', () => {
    render(<Dropdown {...props} ariaInvalid="true" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-required', 'true');
    expect(button).toHaveAttribute('aria-invalid', 'true');
  });

  it('closes menu when clicking outside', () => {
    render(<Dropdown {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.mouseDown(document);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
