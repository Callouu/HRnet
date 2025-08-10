global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeList from './index';
import '@testing-library/jest-dom';

// Mock store with sample employee data
const mockStore = configureStore({
  reducer: {
    employees: () => ({
      employees: [
        {
          firstName: 'John',
          lastName: 'Doe',
          startDate: '2020-01-15',
          department: 'Marketing',
          dateOfBirth: '1985-05-10',
          street: '123 Main St',
          city: 'New York',
          state: { abbreviation: 'NY' },
          zipCode: '10001'
        }
      ]
    })
  }
});

describe('EmployeeList Component', () => {
  it('renders the employee table', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <EmployeeList />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Employee List')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('filters employees based on search input', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <EmployeeList />
        </Provider>
      </BrowserRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(screen.getByText('John')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Jane' } });
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  it('formats dates correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <EmployeeList />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('15/01/2020')).toBeInTheDocument();
    expect(screen.getByText('10/05/1985')).toBeInTheDocument();
  });
});
