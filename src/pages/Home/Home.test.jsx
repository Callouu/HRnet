import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './index';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  it('renders the main title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('HRnet')).toBeInTheDocument();
  });

  it('renders the employee creation form', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Create Employee')).toBeInTheDocument();
  });

  it('has a link to employee list page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('View current employee')).toBeInTheDocument();
  });
});
