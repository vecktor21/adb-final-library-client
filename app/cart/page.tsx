"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCart from "@/src/services/fetchCart";
import Link from "next/link";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState();

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(`http://localhost:5000/api/Carts/${userId}`);

      if (!response.ok) {
        console.log("Error posting data");
        return;
      }

      const responseData = await response.json();
      setData(responseData);
      console.log("Response:", responseData);
    };

    getCart();
  }, []);

  return (
    <div className="cart container" style={{paddingTop: 150}}>
      <h1 style={{ marginBottom: 50 }}>Cart</h1>
      {data &&
        data.books.map((item, index) => {
          return (
            <Link className="link" style={{width: 'fit-content'}} href={`/${item.book.id}`} key={index}>
              <div
                className="book-cart"
                style={{
                  width: 190,
                  height: 260,
                  border: "1px solid black",
                  marginBottom: 50,
                }}
              >
                <p className="book-cart-title">{item.book.title}</p>
                <p className="book-cart-author">{item.book.author}</p>
                <p className="book-cart-price">{item.book.price}</p>
                <p className="book-cart-count">Count: {item.count}</p>
              </div>
            </Link>
          );
        })}
      <hr />
      <h1 style={{marginTop: 30}}>Total: {data && data.total}</h1>
    </div>
  );
};

export default Cart;
