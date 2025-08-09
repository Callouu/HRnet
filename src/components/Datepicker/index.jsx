import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

/**
 * DatePicker component for custom date selection.
 *
 * @param {string} name - Name of the field (for forms).
 * @param {string} value - Selected date in ISO format (e.g. "2025-08-06").
 * @param {function} onChange - Callback when a date is selected.
 * @param {boolean} required - If true, marks the field as required.
 * @param {string} ariaInvalid - "true" if the field is invalid (for accessibility).
 * @param {string} [placeholder] - Placeholder text when no date is selected.
 *
 * - Displays a custom calendar popup for date selection.
 * - Allows month and year selection via dropdowns.
 * - Handles outside click to close the calendar.
 * 
 * @category Components
 * @component
 * @returns {React.Component} A React component of a datepicker.
 */
function DatePicker({ name, value, onChange, required, ariaInvalid, placeholder = "Select a date" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the calendar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set the current date based on today's date
  const [currentDate, setCurrentDate] = useState(() =>
    value ? new Date(value) : new Date()
  );
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate the number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();


  // Format the date
  const localeDate = (date) =>
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  // Handle date selection
  const handleDate = (day) => {
    const selected = new Date(year, month, day);
    onChange({ target: { name, value: localeDate(selected) } });
    setOpen(false);
  };

  // Handle month navigation
  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

  // Generate years from 1970 to 2070
  const years = Array.from({ length: 101 }, (_, i) => 1970 + i);

  const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

  return (
    <div className="custom-datepicker" ref={ref}>
      {/* Open Calendar */}
      <button
        type="button"
        className="custom-datepicker__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-invalid={ariaInvalid}
        aria-required={required ? "true" : "false"}
      >
        <span>
          {value ? new Date(value).toLocaleDateString("fr-FR") : placeholder}
        </span>
        <span className="custom-datepicker__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {/* Calendar Menu */}
      {open && (
        <div className="custom-datepicker__popup">
          <div className="custom-datepicker__header">
            {/* Previous month */}
            <button type="button" onClick={handlePrev}>&lt;</button>
            <span>
              {/* Month Dropdown */}
            <select
              className="custom-datepicker__month-select"
              value={month}
              onChange={e =>
                setCurrentDate(new Date(year, Number(e.target.value), 1))
              }
            >
              {months.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
              {/* Select for the year */}
              <select
                className="custom-datepicker__year-select"
                value={year}
                onChange={(e) =>
                  setCurrentDate(new Date(Number(e.target.value), month, 1))
                }
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </span>
            {/* Next month */}
            <button type="button" onClick={handleNext}>&gt;</button>
          </div>
          <div className="custom-datepicker__calendar">
            {/* Jours de la semaine */}
            <div className="custom-datepicker__weekdays">
              {["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"].map((d) => (
                <div key={d} className="custom-datepicker__weekday">{d}</div>
              ))}
            </div>
            {/* Days for the current month */}
            <div className="custom-datepicker__days">
              {[...Array(firstDay).keys()].map((_, i) => (
                <div key={`empty-${i}`} className="custom-datepicker__day empty"></div>
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const iso = localeDate(new Date(year, month, day));
                return (
                  <div
                    key={day}
                    className={`custom-datepicker__day${value === iso ? " selected" : ""}`}
                    onClick={() => handleDate(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;