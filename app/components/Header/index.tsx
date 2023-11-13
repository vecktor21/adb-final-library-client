import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { useSelector } from "react-redux";

const Header = () => {
  const userId = localStorage.getItem("userId");
  console.log("header", userId);

  const [state, setState] = useState(userId);

  //  const userId1 = useAppSelector((state) => state.userId);
  const dispatch = useAppDispatch();

  const userId1 = useSelector((state) => state.todos.userId);
  console.log("userId", userId1);

  return (
    <header className="container">
      <Link className="link" href="/">
        <h1>{userId1}</h1>
        <h1>Booky</h1>
      </Link>
      <div>
        <Link className="link" href="/">
          <span>catalog</span>
        </Link>
        <Link className="link" href="/profile">
          <span>profile</span>
        </Link>
        <Link className="link" href="/cart">
          <span>cart</span>
        </Link>
        {/*<Link className="link" href="/authorization">
          <span>sign in</span>
        </Link>
        <Link className="link" href="/registration">
          <span>sign up</span>
        </Link>*/}
        {userId1 === null || userId1 === undefined || userId1 === "" ? (
          <>
            <Link className="link" href="/authorization">
              <span>sign in</span>
            </Link>
            <Link className="link" href="/registration">
              <span>sign up</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              className="link"
              href="/"
              onClick={() => {
                localStorage.clear();
                dispatch(setUserId(''));
              }}
            >
              <span>exit</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
