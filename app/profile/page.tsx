"use client";

import fetchUser from "@/src/services/fetchUser";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const Profile = () => {
  const userId = localStorage.getItem("userId");

  const results = useQuery(["user", userId], fetchUser);

  if (results.isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>Loading</h1>
      </div>
    );
  }

  console.log(results.data);
  return (
    <div className="profile container">
      <h1>{results.data.name}</h1>
      <h1>{results.data.surname}</h1>
      <h1>{results.data.email}</h1>
      <h1>{results.data.age}</h1>
      <h1>{results.data.phoneNumber}</h1>
    </div>
  );
};

export default Profile;
