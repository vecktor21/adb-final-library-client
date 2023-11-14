"use client";

import fetchUser from "@/src/services/fetchUser";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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

  const addToCart = async (bookId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/Carts/${userId}/book/${bookId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      }
    );

    if (!response.ok) {
      console.log("Error posting data");
      return;
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
  };

  return (
    <div className="profile container" style={{ paddingTop: 100 }}>
      <h2>
        Full name: {results.data.name} {results.data.surname}
      </h2>
      <br />
      <h3>Email: {results.data.email}</h3>
      <br />
      <h3>Age: {results.data.age}</h3>
      <br />
      <h3>Phone number: {results.data.phoneNumber}</h3>
      <br />
      <div>
        <h2 style={{ textDecoration: "underline" }}>Recommendations</h2>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            //justifyContent: "space-between",
          }}
        >
          {data &&
            data.map((book, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <div className="catalog__book pointer">
                    <Link className="link" href={`/${book.id}`}>
                      <p className="catalog__book-title">{book.title}</p>
                      <p className="catalog__book-author">{book.author}</p>
                      <p className="catalog__book-price">{book.price}</p>
                    </Link>
                  </div>
                  <input
                    className="catalog__book-button pointer"
                    style={{ marginRight: 50, marginTop: 20 }}
                    type="button"
                    value="Add to cart"
                    onClick={() => addToCart(book.id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <br />
      <div>
        <h2 style={{ textDecoration: "underline" }}>History</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            //justifyContent: "space-between",
          }}
        >
          {historyData &&
            historyData.map((book, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <div className="catalog__book pointer">
                    <Link className="link" href={`/${book.id}`}>
                      <p className="catalog__book-title">{book.title}</p>
                      <p className="catalog__book-author">{book.author}</p>
                      <p className="catalog__book-price">{book.price}</p>
                    </Link>
                  </div>
                  <input
                    className="catalog__book-button pointer"
                    style={{ marginRight: 50, marginTop: 20 }}
                    type="button"
                    value="Add to cart"
                    onClick={() => addToCart(book.id)}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
