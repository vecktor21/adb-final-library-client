"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

const AuthorizationForm = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const router = useRouter();

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

    const accessToken = responseData.accessToken;
    const userData = responseData.user;
    if (localStorage.getItem("token") === null) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", userData);
      localStorage.setItem("userId", userData.id);
      console.log("new token", localStorage.getItem("token"));
      console.log("new user", localStorage.getItem("user"));
    } else {
      console.log("token", localStorage.getItem("token"));
      console.log("user", localStorage.getItem("user"));
    }

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
