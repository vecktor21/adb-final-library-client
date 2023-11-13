"use client";

import { useQuery } from "@tanstack/react-query";
import fetchBooks from "@/src/services/fetchBooks";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { register, handleSubmit, reset, control } = useForm();
  const [filter, setFilter] = useState("All");

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
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data.filter);
          setFilter(data.filter);
        })}
      >
        <select {...register("filter")}>
          <option value="All">All</option>
          <option value="Научная литература">Научная литература</option>
          <option value="Фантастика">Фантастика</option>
          <option value="Бизнес">Бизнес</option>
        </select>
        <input type="submit" value="Apply" />
      </form>
		<br />
      <div className="catalog__books">
        {results.data.map((book, index: number) => {
          if (filter === "All") {
            return (
              <div className="catalog__book pointer" key={index}>
                <Link className="link" href={`/${book.id}`}>
                  <p className="catalog__book-title">{book.title}</p>
                  <p className="catalog__book-author">{book.author}</p>
                  <p className="catalog__book-price">{book.price}</p>
                </Link>
                <input
                  type="button"
                  value="Add to cart"
                  onClick={() => addToCart(book.id)}
                />
              </div>
            );
          } else if (book.genre === filter) {
            return (
              <div className="catalog__book pointer" key={index}>
                <Link className="link" href={`/${book.id}`}>
                  <p className="catalog__book-title">{book.title}</p>
                  <p className="catalog__book-author">{book.author}</p>
                  <p className="catalog__book-price">{book.price}</p>
                </Link>
                <input
                  type="button"
                  value="Add to cart"
                  onClick={() => addToCart(book.id)}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
