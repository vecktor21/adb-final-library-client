"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
};

const AuthorizationForm = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

  console.log(router)

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    console.log(data);
    const response = await fetch("http://localhost:5000/api/Authorization", {
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
	 router.push("/");
    reset();
  };

  return (
    <div className="authorization__form--wrapper">
      <h1 style={{ color: "white", textAlign: "center" }}>Authorization</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          required
          placeholder="Email address"
          type="email"
        />
        <input
          {...register("password")}
          required
          placeholder="Password"
          type="text"
        />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default AuthorizationForm;
