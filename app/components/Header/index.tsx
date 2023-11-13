import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const userId = localStorage.getItem("userId");
  console.log("header", userId);

  const [state, setState] = useState(userId);

  return (
    <header className="container">
      <Link className="link" href="/">
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
        {state === null ? (
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
              onClick={() => localStorage.clear()}
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
