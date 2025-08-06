import React, { useState, useRef, useEffect } from "react";
import "./style.scss";

function Dropdown({
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Ferme le menu si on clique en dehors
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
        type="button"
        className="ropdown__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        name={name}
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
