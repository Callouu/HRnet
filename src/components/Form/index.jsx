import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeeSlice";
import Dropdown from "../Dropdown";
import DatePicker from "../Datepicker";
import states from "../../data/states";
import departments from "../../data/departments";
import "./style.scss";

/**
 * Form component for creating a new employee.
 *
 * @param {function} onSubmitSuccess - Callback called after successful form submission.
 *
 * - Handles all form fields and their state.
 * - Validates inputs using regex rules and required checks.
 * - Displays error messages and red borders for invalid fields.
 * - Prevents submission if the form is invalid.
 * - Uses custom Dropdown and DatePicker components.
 *
 * @category Components
 * @component
 * @returns {React.Component} A React component of a form.
 */
function Form({ onSubmitSuccess }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [filled, setfilled] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: { name: "", abbreviation: "" },
    zipCode: "",
    department: "",
  });

  // Regex rules for validation
  const regexRules = {
    firstName: /^[A-Za-zÀ-ÿ' -]{2,30}$/,
    lastName: /^[A-Za-zÀ-ÿ' -]{2,30}$/,
    zipCode: /^\d{5}$/,
    city: /^[A-Za-zÀ-ÿ' -]{2,40}$/,
    street: /^.{2,60}$/,
  };

  // Validates a single field based on regex rules
  const isValid = (name, value) => {
    if (!regexRules[name]) return true;
    return regexRules[name].test(value);
  };

  // Checks if the entire form is valid
  const isFormValid = () => {
    for (const key in regexRules) {
      if (!isValid(key, formData[key])) return false;
    }
    if (
      !formData.dateOfBirth ||
      !formData.startDate ||
      !formData.state.abbreviation ||
      !formData.department
    )
      return false;
    return true;
  };

  /**
   * Handles input changes for all fields.
   * Updates form data, marks field as filled, and sets error state.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setfilled((prev) => ({ ...prev, [name]: true }));

    if (name === "state") {
      const selected = states.find((s) => s.abbreviation === value);
      setFormData((prev) => ({
        ...prev,
        state: selected
          ? { name: selected.name, abbreviation: selected.abbreviation }
          : { name: "", abbreviation: "" },
      }));
      setErrors((prev) => ({
        ...prev,
        state: !value,
      }));
    } else if (name === "department") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        department: !value,
      }));
    } else if (name === "dateOfBirth" || name === "startDate") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: !value,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: !isValid(name, value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all fields as filled to show errors
    setfilled({
      firstName: true,
      lastName: true,
      dateOfBirth: true,
      startDate: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      department: true,
    });
    // Set errors for all fields
    setErrors({
      firstName: !isValid("firstName", formData.firstName),
      lastName: !isValid("lastName", formData.lastName),
      dateOfBirth: !formData.dateOfBirth,
      startDate: !formData.startDate,
      street: !isValid("street", formData.street),
      city: !isValid("city", formData.city),
      state: !formData.state.abbreviation,
      zipCode: !isValid("zipCode", formData.zipCode),
      department: !formData.department,
    });
    // Empêche la soumission si le formulaire est invalide
    if (!isFormValid()) return;
    dispatch(addEmployee(formData));
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      street: "",
      city: "",
      state: { name: "", abbreviation: "" },
      zipCode: "",
      department: "",
    });
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__section">
        <label className="form__section__label" htmlFor="firstName">
          First Name:*
        </label>
        <input
          id="firstName"
          className="form__section__input"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          aria-invalid={filled.firstName && errors.firstName ? "true" : "false"}
          aria-describedby={
            filled.firstName && errors.firstName ? "firstName-error" : undefined
          }
        />
        {filled.firstName && errors.firstName && (
          <span
            id="firstName-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            First name is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="lastName">
          Last Name:*
        </label>
        <input
          id="lastName"
          className="form__section__input"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          aria-invalid={filled.lastName && errors.lastName ? "true" : "false"}
          aria-describedby={
            filled.lastName && errors.lastName ? "lastName-error" : undefined
          }
        />
        {filled.lastName && errors.lastName && (
          <span
            id="lastName-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            last name is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label">Date of Birth:*</label>
        <DatePicker
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          ariaInvalid={
            filled.dateOfBirth && errors.dateOfBirth ? "true" : "false"
          }
          ariaDescribedby={
            filled.dateOfBirth && errors.dateOfBirth
              ? "dateOfBirth-error"
              : undefined
          }
        />
        {filled.dateOfBirth && errors.dateOfBirth && (
          <span
            id="dateOfBirth-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            Date of birth is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="startDate">
          Start Date:*
        </label>
        <DatePicker
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          ariaInvalid={filled.startDate && errors.startDate ? "true" : "false"}
          ariaDescribedby={
            filled.startDate && errors.startDate ? "startDate-error" : undefined
          }
        />
        {filled.startDate && errors.startDate && (
          <span
            id="startDate-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            Start date is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="street">
          Street:*
        </label>
        <input
          id="street"
          className="form__section__input"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          aria-invalid={filled.street && errors.street ? "true" : "false"}
          aria-describedby={
            filled.street && errors.street ? "street-error" : undefined
          }
        />
        {filled.street && errors.street && (
          <span
            id="street-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            Street is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="city">
          City:*
        </label>
        <input
          id="city"
          className="form__section__input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          aria-invalid={filled.city && errors.city ? "true" : "false"}
          aria-describedby={
            filled.city && errors.city ? "city-error" : undefined
          }
        />
        {filled.city && errors.city && (
          <span
            id="city-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            City is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="state">
          State:*
        </label>
        <Dropdown
          id="state"
          name="state"
          options={states.map((s) => ({
            label: s.name,
            value: s.abbreviation,
          }))}
          value={formData.state.abbreviation}
          onChange={handleChange}
          ariaInvalid={filled.state && errors.state ? "true" : "false"}
          ariaDescribedby={
            filled.state && errors.state ? "state-error" : undefined
          }
        />
        {filled.state && errors.state && (
          <span
            id="state-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            State is required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="zipCode">
          Zip Code:*
        </label>
        <input
          id="zipCode"
          className="form__section__input"
          type="number"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          aria-invalid={filled.zipCode && errors.zipCode ? "true" : "false"}
          aria-describedby={
            filled.zipCode && errors.zipCode ? "zipCode-error" : undefined
          }
        />
        {filled.zipCode && errors.zipCode && (
          <span
            id="zipCode-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            5-digit zip code required
          </span>
        )}
      </div>
      <div className="form__section">
        <label className="form__section__label" htmlFor="department">Department:*</label>
        <Dropdown
          id="department"
          name="department"
          options={departments.map((s) => ({
            label: s.name,
            value: s.name,
          }))}
          value={formData.department}
          onChange={handleChange}
          ariaInvalid={
            filled.department && errors.department ? "true" : "false"
          }
          ariaDescribedby={
            filled.department && errors.department
              ? "department-error"
              : undefined
          }
        />
        {filled.department && errors.department && (
          <span
            id="department-error"
            className="form__error"
            role="alert"
            aria-live="assertive"
          >
            Department is required
          </span>
        )}
      </div>
      <div className="form__section">
        <div className="form__section__button">
          <button type="submit">Create</button>
        </div>
      </div>
    </form>
  );
}

export default Form;
