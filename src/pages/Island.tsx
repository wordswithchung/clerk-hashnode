import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { FirestoreProvider } from "@react-firebase/firestore";
import { FirebaseConfig } from "../firebase";
import { getIslandProfile } from "../helpers/helper";
import Firebase from "firebase";
import "firebase/firestore";
import { FirestoreDocument } from "@react-firebase/firestore";
import { RandomIcon } from "../assets/iconsList";
import "./Island.css";

const userIsland = (userData) => {
  const info = getIslandProfile(userData);
  return (
    <div className="user-island">
      <RandomIcon />
      <h2>{info.islandName}</h2>
      <p>
        Resident: <strong>{info.userName}</strong>
      </p>
      <p>
        Dream Address: <strong>{info.dreamAddress}</strong>
      </p>
      <p>
        Villagers:{" "}
        {info.villagers.map((v, index) => (
          <span key={`${v}-${index}`}>{v}</span>
        ))}
      </p>
    </div>
  );
};

export const Island = (props) => {
  const [id, setId] = React.useState(null);
  const path = window.location.pathname.split("/");
  const islandName = path[path.length - 1];

  React.useEffect(() => {
    if (islandName) {
      Firebase.firestore()
        .collection("urls")
        .doc(`${islandName}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { userId } = doc.data();
            setId(userId.replace(/ /g, ""));
          } else {
            console.log("Nothing found; handle error");
          }
        });
    }
  }, [islandName, id]);

  return (
    <FirestoreProvider {...FirebaseConfig} firebase={firebase}>
      {!!id ? (
        <FirestoreDocument path={`/users/${id}`}>
          {(d) => {
            return userIsland(d.value);
          }}
        </FirestoreDocument>
      ) : (
        <div>Loading...</div>
      )}
    </FirestoreProvider>
  );
};
