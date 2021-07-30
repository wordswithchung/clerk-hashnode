import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/the-acnh-ipelago.png";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <div>
        <Link to="/">
          <img src={logo} alt="the acnh-ipelago logo" />
        </Link>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="header-links">
          <Link className="header-link" to="/sign-up/">
            Sign up
          </Link>
          <Link className="header-link" to="/sign-in/">
            Log in
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};
