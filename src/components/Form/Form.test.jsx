import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Form from "./index";
import employeeReducer from "../../store/employeeSlice";

const mockStore = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

describe("Form Component", () => {
  const mockSubmitSuccess = jest.fn();

  beforeEach(() => {
    mockSubmitSuccess.mockClear();
  });

  it("renders all form fields", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    expect(screen.getByLabelText("First Name:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Street:*")).toBeInTheDocument();
    expect(screen.getByLabelText("City:*")).toBeInTheDocument();
    expect(screen.getByLabelText("State:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Zip Code:*")).toBeInTheDocument();
    expect(screen.getByLabelText("Department:*")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("shows errors when submitting empty form", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    // Adapte le nombre selon tes champs obligatoires
    expect(screen.getAllByText(/is required/)).toHaveLength(8);
  });

  it("validates field formats", () => {
    render(
      <Provider store={mockStore}>
        <Form />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("First Name:*"), {
      target: { name: "firstName", value: "A" },
    });
    expect(screen.getByText("First name is required")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Zip Code:*"), {
      target: { name: "zipCode", value: "123" },
    });
    expect(screen.getByText("5-digit zip code required")).toBeInTheDocument();
  });

  it("submits form with valid data", () => {
    render(
      <Provider store={mockStore}>
        <Form onSubmitSuccess={mockSubmitSuccess} />
      </Provider>
    );

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

    // Ouvre le dropdown State et sélectionne Alabama
    fireEvent.click(screen.getByLabelText("State:*"));
    fireEvent.click(screen.getByText("Alabama"));

    // Ouvre le dropdown Department et sélectionne Engineering
    fireEvent.click(screen.getByLabelText("Department:*"));
    fireEvent.click(screen.getByText("Engineering"));

    // DatePicker Date of Birth
    fireEvent.click(screen.getByLabelText("Date of Birth:*"));
    fireEvent.click(screen.getByText("1"));

    // DatePicker Start Date
    fireEvent.click(screen.getByLabelText("Start Date:*"));
    fireEvent.click(screen.getByText("1"));

    // Soumet le formulaire
    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(mockSubmitSuccess).toHaveBeenCalled();
  });

  it("resets form after successful submission", async () => {
    render(
      <Provider store={mockStore}>
        <Form onSubmitSuccess={mockSubmitSuccess} />
      </Provider>
    );

    const firstNameInput = screen.getByLabelText("First Name:*");
    const lastNameInput = screen.getByLabelText("Last Name:*");

    fireEvent.change(firstNameInput, {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(lastNameInput, {
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

    await waitFor(
      () => {
        expect(screen.getByLabelText("First Name:*")).toHaveValue("");
      },
      { timeout: 3000 }
    );
  });
});
