"use client";

import { useQuery } from "@tanstack/react-query";
import fetchBooks from "@/src/services/fetchBooks";
import Link from "next/link";

export default function Home() {
  const userId = localStorage.getItem("userId");

  const results = useQuery(["books"], fetchBooks);

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
    <div className="catalog container">
      <div className="catalog__books">
        {results.data.map((book, index: number) => {
          return (
            //<Link className="link" href={`/${book.id}`} key={index}>
              <div className="catalog__book pointer">
                <p className="catalog__book-title">{book.title}</p>
                <p className="catalog__book-author">{book.author}</p>
                <p className="catalog__book-price">{book.price}</p>
                <input
                  type="button"
                  value="Add to cart"
                  onClick={() => addToCart(book.id)}
                />
              </div>
            //</Link>
          );
        })}
      </div>
    </div>
  );
}
