import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/employeeSlice";
import Dropdown from "../Dropdown";
import DatePicker from "../Datepicker";
import states from "../../data/states";
import departments from "../../data/departments";
import "./style.scss";

function Form({ onSubmitSuccess }) {
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      const selected = states.find((s) => s.abbreviation === value);
      setFormData((prev) => ({
        ...prev,
        state: selected
          ? { name: selected.name, abbreviation: selected.abbreviation }
          : { name: "", abbreviation: "" },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <label className="form__section__label">First Name:</label>
        <input
          className="form__section__input"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Last Name:</label>
        <input
          className="form__section__input"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Date of Birth:</label>
        <DatePicker
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Start Date:</label>
        <DatePicker
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Street:</label>
        <input
          className="form__section__input"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">City:</label>
        <input
          className="form__section__input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">State:</label>
        <Dropdown
          name="state"
          options={states.map((s) => ({
            label: s.name,
            value: s.abbreviation,
          }))}
          value={formData.state.abbreviation}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Zip Code:</label>
        <input
          className="form__section__input"
          type="number"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form__section">
        <label className="form__section__label">Department:</label>
        <Dropdown
          name="department"
          options={departments.map((s) => ({
            label: s.name,
            value: s.name,
          }))}
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default Form;
