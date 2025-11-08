import React from "react";

function FormInput({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

export default FormInput;
