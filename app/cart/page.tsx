"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCart from "@/src/services/fetchCart";

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
    <div className="cart container">
      <h1>Cart</h1>
      {data &&
        data.books.map((item, index) => {
          return (
            <div key={index}>
              <h1>{item.book.title}</h1>
              <h1>{item.book.publishCity}</h1>
            </div>
          );
        })}
      {data && data.total}
    </div>
  );
};

export default Cart;
