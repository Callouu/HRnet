global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('opens modal on form submission', async () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      </Provider>
    );

    // Remplir tous les champs obligatoires du formulaire
    fireEvent.change(screen.getByLabelText("First Name:*"), {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:*"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Street:*"), {
      target: { name: "street", value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("City:*"), {
      target: { name: "city", value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Zip Code:*"), {
      target: { name: "zipCode", value: "75000" },
    });

    // Sélectionner State
    fireEvent.click(screen.getByLabelText("State:*"));
    fireEvent.click(screen.getByText("Alabama"));

    // Sélectionner Department
    fireEvent.click(screen.getByLabelText("Department:*"));
    fireEvent.click(screen.getByText("Engineering"));

    // Sélectionner Date of Birth
    fireEvent.click(screen.getByLabelText("Date of Birth:*"));
    fireEvent.click(screen.getByText("1"));

    // Sélectionner Start Date
    fireEvent.click(screen.getByLabelText("Start Date:*"));
    fireEvent.click(screen.getByText("1"));

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Vérifier que la modale s'ouvre avec le bon texte
    await waitFor(() => {
      expect(screen.getByText("Employee created !")).toBeInTheDocument();
    });
  });

  it('closes modal when clicking outside or on close button', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // Remplir tous les champs obligatoires du formulaire
    fireEvent.change(screen.getByLabelText("First Name:*"), {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:*"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Street:*"), {
      target: { name: "street", value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("City:*"), {
      target: { name: "city", value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Zip Code:*"), {
      target: { name: "zipCode", value: "75000" },
    });

    fireEvent.click(screen.getByLabelText("State:*"));
    fireEvent.click(screen.getByText("Alabama"));

    fireEvent.click(screen.getByLabelText("Department:*"));
    fireEvent.click(screen.getByText("Engineering"));

    fireEvent.click(screen.getByLabelText("Date of Birth:*"));
    fireEvent.click(screen.getByText("1"));

    fireEvent.click(screen.getByLabelText("Start Date:*"));
    fireEvent.click(screen.getByText("1"));

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Vérifier que la modale s'ouvre
    await waitFor(() => {
      expect(screen.getByText("Employee created !")).toBeInTheDocument();
    });

    // Fermer la modale en cliquant sur l'overlay
    fireEvent.click(document.body.querySelector(".modal-overlay"));
    await waitFor(() => {
      expect(screen.queryByText("Employee created !")).not.toBeInTheDocument();
    });

    // Remplir tous les champs obligatoires du formulaire
    fireEvent.change(screen.getByLabelText("First Name:*"), {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name:*"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Street:*"), {
      target: { name: "street", value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText("City:*"), {
      target: { name: "city", value: "Paris" },
    });
    fireEvent.change(screen.getByLabelText("Zip Code:*"), {
      target: { name: "zipCode", value: "75000" },
    });

    fireEvent.click(screen.getByLabelText("State:*"));
    fireEvent.click(screen.getByText("Alabama"));

    fireEvent.click(screen.getByLabelText("Department:*"));
    fireEvent.click(screen.getByText("Engineering"));

    fireEvent.click(screen.getByLabelText("Date of Birth:*"));
    fireEvent.click(screen.getByText("1"));

    fireEvent.click(screen.getByLabelText("Start Date:*"));
    fireEvent.click(screen.getByText("1"));

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Rouvrir la modale
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    await waitFor(() => {
      expect(screen.getByText("Employee created !")).toBeInTheDocument();
    });

    fireEvent.click(document.body.querySelector(".modal-close"));
    await waitFor(() => {
      expect(screen.queryByText("Employee created !")).not.toBeInTheDocument();
    });
  });
});
