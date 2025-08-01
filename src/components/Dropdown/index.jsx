import React from 'react'

function Dropdown({ name, options, value, onChange }) {
  return (
    <select 
      name={name}
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Select...</option>
      {options.map((option, index) => {
        // Supporte { label, value } ou string
        const optionValue = option.value !== undefined ? option.value : option;
        const displayText = option.label !== undefined ? option.label : option;
        return (
          <option key={index} value={optionValue}>
            {displayText}
          </option>
        );
      })}
    </select>
  )
}

export default Dropdown
