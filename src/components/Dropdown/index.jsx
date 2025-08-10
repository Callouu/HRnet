import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

/**
 * Dropdown component for custom select functionality.
 *
 * @param {string} name - Name of the field (for forms).
 * @param {Array} options - Array of options (string or {label, value} objects).
 * @param {string} value - Selected value.
 * @param {function} onChange - Callback when an option is selected.
 * @param {boolean} required - If true, marks the field as required.
 * @param {string} ariaInvalid - "true" if the field is invalid (for accessibility).
 * @param {string} [placeholder] - Placeholder text when no value is selected.
 *
 * - Displays a custom dropdown menu.
 * - Handles outside click to close the menu.
 * - Shows a dynamic arrow depending on open/closed state.
 * - Supports accessibility attributes.
 * 
 * @category Components
 * @component
 * @returns {React.Component} A React component of a dropdown.
 */
function Dropdown({
  name,
  options,
  value,
  onChange,
  required,
  ariaInvalid,
  id,
  ariaLabelledby,
  placeholder = "Select an option",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) =>
    typeof opt === "object" ? opt.value === value : opt === value
  );

  return (
    <div className="dropdown" ref={ref}>
      <button
        id={id}
        aria-labelledby={ariaLabelledby}
        type="button"
        className="dropdown__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        name={name}
        aria-invalid={ariaInvalid}
        aria-required={required ? "true" : "false"}
      >
        <span>
          {selected
            ? typeof selected === "object"
              ? selected.label
              : selected
            : placeholder}
        </span>
        <span className="dropdown__arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((option, idx) => {
            const optionValue =
              typeof option === "object" ? option.value : option;
            const displayText =
              typeof option === "object" ? option.label : option;
            return (
              <li
                key={optionValue}
                className={`dropdown__option${
                  optionValue === value ? " selected" : ""
                }`}
                role="option"
                aria-selected={optionValue === value}
                tabIndex={0}
                onClick={() => {
                  onChange({ target: { name, value: optionValue } });
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onChange({ target: { name, value: optionValue } });
                    setOpen(false);
                  }
                }}
              >
                {displayText}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
