"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchBooks from "@/src/services/fetchBooks";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [filter, setFilter] = useState("All");
  const { data: books, isLoading } = useQuery(["books"], fetchBooks);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (!isLoading && books) {
      const genresArr = [...new Set(books.map((book) => book.genre))];
      setGenres(genresArr);
    }
  }, [isLoading, books]);

  const addToCart = async (bookId) => {
    const userId = localStorage.getItem("userId");
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
        <select className="select" {...register("filter")}>
          {genres.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <input className="apply" type="submit" value="Apply" />
      </form>
      <br />
      <div className="catalog__books">
        {!isLoading &&
          books.map((book, index) => {
            if (filter === "All" || book.genre === filter) {
              return (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div className="catalog__book pointer" key={index}>
                    <Link className="link" href={`/${book.id}`}>
                      <p className="catalog__book-title">{book.title}</p>
                      <p className="catalog__book-author">{book.author}</p>
                      <p className="catalog__book-price">{book.price}</p>
                    </Link>
                  </div>
                  <input
                    type="button"
                    style={{
                      background: "white",
                      border: "1px solid black",
                      padding: "7px 10px",
                      borderRadius: 15,
                      marginRight: 50,
                      marginTop: 20,
                    }}
                    value="Add to cart"
                    onClick={() => addToCart(book.id)}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}
