import React from "react";

export default function FormInput({ label, type = "text", name, register, errors, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="font-semibold mb-1 text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
          errors[name] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
