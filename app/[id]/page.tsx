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
    const getBookData = async () => {
      const response = await fetch(`http://localhost:5000/api/Books/${id}`);

      if (!response.ok) {
        console.log("Error posting data");
        return;
      }

      const responseData = await response.json();
      setData(responseData);
      console.log("Response:", responseData.likes);
    };

    getBookData();

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
  return (
    <div className="book container">
      <div className="book__information">
        <h1>{data && data.title}</h1>
        <h1>{data && data.author}</h1>
        <h1>{data && data.genre}</h1>
        <h1>{data && data.year}</h1>
        <h1>price: {data && data.price}</h1>
        <h1>{data && data.description}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h1>{data && data.likes.length}</h1>
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
      </div>
    </div>
  );
};

export default Book;
