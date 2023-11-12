"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  surname: string;
  email: string;
  age: number;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  description: string | null;
  role: string | null;
};

const RegistrationForm = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    const response = await fetch("http://localhost:5000/api/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Error posting data");
      return;
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    router.push("/authorization");
    reset();
  };

  return (
    <div className="registration__form--wrapper">
      <h1 style={{ color: "white" }}>Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          required
          placeholder="Enter your name"
          type="text"
        />
        <input
          {...register("surname")}
          required
          placeholder="Enter your surname"
          type="text"
        />
        <input
          {...register("email")}
          required
          placeholder="Enter your email address"
          type="email"
        />
        <input
          {...register("age")}
          required
          placeholder="Enter your age"
          type="number"
        />
        <input
          {...register("phoneNumber")}
          required
          placeholder="Enter your phone number"
          type="text"
        />
        <input
          {...register("password")}
          required
          placeholder="Enter password"
          type="text"
        />
        <input
          {...register("repeatPassword")}
          required
          placeholder="Repeat the password"
          type="string"
        />
        <input
          {...register("description")}
          placeholder="Description"
          type="text"
        />
        <input
          {...register("role")}
          placeholder="Enter your role"
          type="text"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default RegistrationForm;
