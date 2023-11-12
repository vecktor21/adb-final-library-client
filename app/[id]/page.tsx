"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchBook from "@/src/services/fetchBook";

const Book = () => {
  const { id } = useParams();

  const results = useQuery(["books", id], fetchBook);

  if (results.isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>Loading</h1>
      </div>
    );
  }

  console.log(results.data);
  return (
    <div className="book container">
      <div className="book__information">
        <h1>{results.data.title}</h1>
        <h1>{results.data.author}</h1>
        <h1>{results.data.genre}</h1>
        <h1>{results.data.year}</h1>
        <h1>price: {results.data.price}</h1>
        <h1>{results.data.description}</h1>
      </div>
    </div>
  );
};

export default Book;
