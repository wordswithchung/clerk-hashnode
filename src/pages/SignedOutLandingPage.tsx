import React from "react";
import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";
import "./SignedOutLandingPage.css";

export const SignedOutLandingPage = (props) => {
  return (
    <div className="landing-wrapper">
      <img
        className="picture"
        src={welcome}
        alt="Welcome to the acnh-ipelago"
      />
      <h2 className="landing-subtitle">
        Create your Island Info page and meet other Island Residents!
      </h2>
      <button className="landing-button">
        <Link to="/sign-up/" className="landing-button-text">
          Sign up
        </Link>
      </button>
    </div>
  );
};
