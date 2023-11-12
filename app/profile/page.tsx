"use client";

import fetchUser from "@/src/services/fetchUser";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState();
  const [historyData, setHistoryData] = useState();
  const results = useQuery(["user", userId], fetchUser);

  useEffect(() => {
    const getRecommendations = async () => {
      const response = await fetch(
        `http://localhost:5000/api/Users/${userId}/recomendations`
      );

      if (!response.ok) {
        console.log("Error posting data");
        return;
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
      setData(responseData);
    };

    getRecommendations();

    const getHistory = async () => {
      const response = await fetch(
        `http://localhost:5000/api/Users/${userId}/history`
      );

      if (!response.ok) {
        console.log("Error posting data");
        return;
      }

      const responseData = await response.json();
      setHistoryData(responseData.books);
      console.log("Response:", responseData);
    };

    getHistory();
  }, []);

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
      <br />
      <div>
        <h1>Recommendations</h1>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {data &&
            data.map((book, index) => {
              return (
                <div key={index}>
                  <h1>{book.title}</h1>
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <br />
      <div>
        <h1>History</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {historyData &&
            historyData.map((book, index) => {
              return (
                <div key={index}>
                  <h1>{book.title}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
