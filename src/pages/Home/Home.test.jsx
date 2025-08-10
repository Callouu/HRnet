global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../../store/employeeSlice';


const store = configureStore({
  reducer: {
    employees: employeeReducer
  }
});

describe('Home Component', () => {
  it('renders the main title', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('HRnet')).toBeInTheDocument();
  });

  it('renders the employee creation form', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Create Employee')).toBeInTheDocument();
  });

  it('has a link to employee list page', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('View current employee')).toBeInTheDocument();
  });
});
