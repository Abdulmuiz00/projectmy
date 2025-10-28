import React from "react";

function Button({ label }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200">
      {label}
    </button>
  );
};
export default Button;
