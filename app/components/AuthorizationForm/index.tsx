"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const AuthorizationForm = () => {
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    reset();
  };

  return (
    <div className="authorization__form--wrapper">
      <h1 style={{ color: "white", textAlign: "center" }}>Authorization</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          required
          placeholder="Enter your email address"
          type="email"
        />
        <input
          {...register("password")}
          required
          placeholder="Enter password"
          type="text"
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default AuthorizationForm;
