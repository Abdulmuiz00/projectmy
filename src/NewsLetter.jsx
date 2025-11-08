import React, { useState } from "react";
import FormInput from "./Components/FormInput";

function NewsletterForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage("Please fill in all fields!");
      return;
    }

    setMessage("🎉 Thank you for subscribing to our newsletter!");
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Subscribe to our Newsletter
        </h2>

        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Subscribe
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}

export default NewsletterForm;
