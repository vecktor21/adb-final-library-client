"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchBook from "@/src/services/fetchBook";

const Book = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [color, setColor] = useState("gray");
  const [data, setData] = useState();

  //  const results = useQuery([id, id], fetchBook);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, historyResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/Books/${id}`),
          fetch(`http://localhost:5000/api/Users/${userId}/history/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

        if (!bookResponse.ok) {
          console.error("Error fetching book data");
          return;
        }

        const bookData = await bookResponse.json();
        setData(bookData);

        if (!historyResponse.ok) {
          console.error("Error posting book to history");
          return;
        }

        const historyData = await historyResponse.json();
        console.log("History Response:", historyData.likes);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();

    if (data && data.likes.includes(userId)) {
      setColor("red");
    } else {
      setColor("gray");
    }
  }, [data]);

  const likeUnlike = async () => {
    color === "gray" ? setColor("red") : setColor("gray");

    const response = await fetch(
      `http://localhost:5000/api/Books/${id}/like/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.log("Error posting data");
      return;
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
  };

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
    <div className="book container">
      <div className="book__information">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <div className="book__cover">
            <h1>{data && data.title}</h1>
            <h2 className="book__cover-title">{data && data.author}</h2>
            <h2 className="book__cover-year">{data && data.year}</h2>
          </div>
          <div className="book__wrapper" style={{ marginTop: 100 }}>
            <h2>Genre: {data && data.genre}</h2>
            <h2>Price: {data && data.price}</h2>
            <h2>Publish city: {data && data.piblishCity}</h2>
            <h2>Publisher: {data && data.publisher}</h2>
            <h2>Pages: {data && data.pages}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <h2 style={{ marginTop: 0, marginRight: 10 }}>
                Likes: {data && data.likes.length}
              </h2>

              <svg
                height="24"
                version="1.1"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={likeUnlike}
              >
                <g transform="translate(0 -1028.4)">
                  <path
                    d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                    fill={color}
                  />
                </g>
              </svg>
            </div>
            <input
              className="catalog__book-button pointer"
              style={{
                marginRight: 50,
                marginTop: 20,
                fontSize: 22,
                padding: "10px 20px",
              }}
              type="button"
              value="Add to cart"
              onClick={() => addToCart(id)}
            />
          </div>
        </div>
        <p style={{ marginTop: 50, fontSize: 25 }}>
          {data && data.description}
        </p>
      </div>
    </div>
  );
};

export default Book;
