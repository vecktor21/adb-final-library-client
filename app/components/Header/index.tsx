import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/hooks/hook";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const userId = localStorage.getItem("userId");
  const pathname = usePathname();
  //  console.log("header", userId);
  console.log("pathname:", pathname);
  const [state, setState] = useState(userId);

  //  const userId1 = useAppSelector((state) => state.userId);
  const dispatch = useAppDispatch();

  const userId1 = useSelector((state) => state.todos.userId);
  console.log("userId", userId1);

  return (
    <header style={{ position: "fixed", width: "100%" }}>
      <div className="header container">
        <Link className="link" href="/">
          {/*<h1>{userId1}</h1>*/}
          <h1>Booky</h1>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link
            className={`link ${pathname === "/" ? "link-active" : ""}`}
            href="/"
          >
            <span>catalog</span>
          </Link>
          <Link
            className={`link ${pathname === "/profile" ? "link-active" : ""}`}
            href="/profile"
          >
            <span>profile</span>
          </Link>
          <Link
            className={`link ${pathname === "/cart" ? "link-active" : ""}`}
            href="/cart"
          >
            {/*<span>cart</span>*/}
            <span>
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="35px"
                height="35px"
                viewBox="0 0 902.86 902.86"
              >
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    />
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                    />
                  </g>
                </g>
              </svg>
            </span>
          </Link>
          {/*<Link className="link" href="/authorization">
          <span>sign in</span>
        </Link>
        <Link className="link" href="/registration">
          <span>sign up</span>
        </Link>*/}
          {userId1 === null || userId1 === undefined || userId1 === "" ? (
            <>
              <Link
                className={`link ${
                  pathname === "/authorization" ? "link-active" : ""
                }`}
                href="/authorization"
              >
                <span>sign in</span>
              </Link>
              <Link
                className={`link ${
                  pathname === "/registration" ? "link-active" : ""
                }`}
                href="/registration"
              >
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
                  dispatch(setUserId(""));
                }}
              >
                <span>exit</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
