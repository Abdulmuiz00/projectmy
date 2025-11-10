import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./FormInput";

// ✅ Define Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    alert(`Welcome back, ${data.email}!`);
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
