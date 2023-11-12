import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container">
      <Link className="link" href="/">
        <h2>Booky</h2>
      </Link>
      <div>
        <Link className="link" href="/">
          <span>catalog</span>
        </Link>
        <Link className="link" href="/cart">
          <span>cart</span>
        </Link>
        <Link className="link" href="/profile">
          <span>profile</span>
        </Link>
        <Link className="link" href="/authorization">
          <span>sign in</span>
        </Link>
        <Link className="link" href="/registration">
          <span>sign up</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
