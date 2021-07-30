import React from "react";
import { useUser } from "@clerk/clerk-react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  FirestoreCollection,
  FirestoreDocument,
  FirestoreProvider,
} from "@react-firebase/firestore";
import { FirebaseConfig } from "../firebase";
import { IslandProfile } from "../types";
import "./SignedInLandingPage.css";
import { Link } from "react-router-dom";
import { getIslandProfile } from "../helpers/helper";
import { RandomIcon } from "../assets/iconsList";

const userIsland = (userData) => {
  const info = getIslandProfile(userData);
  return (
    <div className="signed-in-user-island">
      <button className="button">
        <Link to="/edit" className="landing-button-text">
          Edit your info
        </Link>
      </button>
      <h2>{info.islandName}</h2>
      <p>Resident: {info.userName}</p>
      <p>Dream Address: {info.dreamAddress}</p>
      <p>
        Villagers:{" "}
        {info.villagers.map((v, index) => (
          <span key={`${v}-${index}`}>{v}</span>
        ))}
      </p>
    </div>
  );
};

const otherIslands = (currentUserId: string, others: any) => {
  if (!others) return null;
  const theActualOthers: IslandProfile[] = others
    .filter(({ id }) => id !== currentUserId)
    .map((o) => {
      return getIslandProfile(o);
    });

  return (
    <div className="all-other-islands">
      {theActualOthers.map((o) => {
        return (
          <div className="other-island" key={o.id}>
            {/* <img src={Alice} alt="Alice NH Villager Icon" /> */}
            {RandomIcon()}
            <p>
              Meet {o.userName} from {o.islandName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const SignedInLandingPage = (props) => {
  const { id } = useUser();
  return (
    <FirestoreProvider {...FirebaseConfig} firebase={firebase}>
      <FirestoreDocument path={`/users/${id}`}>
        {(d) => {
          return userIsland(d.value);
        }}
      </FirestoreDocument>
      <FirestoreCollection path={`users`}>
        {({ value }) => {
          return !!value ? otherIslands(id, value) : null;
        }}
      </FirestoreCollection>
    </FirestoreProvider>
  );
};
