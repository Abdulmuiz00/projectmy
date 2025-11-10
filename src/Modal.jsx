import { X } from "lucide-react";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import LoginForm from "./Components/Login";

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Modal structure using React Portal
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md z-10">
        <h2 className="text-2xl font-semibold mb-3 text-center text-blue-700">
          Welcome 👋
        </h2>
        <p className="text-gray-700 text-center">
          This modal is rendered using a <b>React Portal</b> — clean, reusable, and easy!
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"><X size={"20px"}/>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      {/* Trigger Button */}
      <LoginForm />
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Open Modal
      </button>

      {/* Conditional Portal Rendering */}
      {isOpen &&
        ReactDOM.createPortal(modalContent, document.getElementById("portal-root"))}
    </div>
  );
};
export default ModalExample;