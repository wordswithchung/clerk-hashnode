import React from "react";
import { Field, Form, Formik } from "formik";
import { useUser } from "@clerk/clerk-react";
import firebase from "firebase/app";
import Firebase from "firebase";
import "firebase/firestore";
import {
  FirestoreDocument,
  FirestoreProvider,
} from "@react-firebase/firestore";
import { FirebaseConfig } from "../firebase";
import { getIslandProfile } from "../helpers/helper";
import { useHistory } from "react-router-dom";
import "./EditForm.css";

const form = (user, update) => {
  if (!user) {
    return null;
  }

  const val = getIslandProfile(user);

  return (
    <div className="form-wrapper">
      <h1>Edit Your Island Details</h1>
      <Formik
        initialValues={{
          userName: val.userName,
          islandName: val.islandName,
          dreamAddress: val.dreamAddress,
          url: val.url,
        }}
        onSubmit={update}
      >
        {() => (
          <Form className="form">
            <label className="form-label">
              Resident Name
              <Field name="userName" />
            </label>
            <label className="form-label">
              Island Name
              <Field name="islandName" />
            </label>
            <label className="form-label">
              Dream Address
              <Field name="dreamAddress" />
            </label>
            <label className="form-label">
              URL
              <Field name="url" />
            </label>
            <button type="submit" className="button">
              <span className="button-text">Submit</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const EditForm = () => {
  const [formFields, setFormFields] = React.useState(null);
  const { id } = useUser();
  const history = useHistory();

  React.useEffect(() => {
    if (formFields !== null) {
      Firebase.firestore().collection("users").doc(`${id}`).set({
        id,
        dreamAddress: formFields?.dreamAddress,
        userName: formFields?.userName,
        islandName: formFields?.islandName,
        url: formFields?.url,
      });
      Firebase.firestore().collection("urls").doc(`${formFields?.url}`).set({
        userId: id,
      });
      history.goBack();
    }
  }, [formFields, history, id]);

  return (
    <FirestoreProvider {...FirebaseConfig} firebase={firebase}>
      <FirestoreDocument path={`/users/${id}`}>
        {(d) => {
          return form(d.value, setFormFields);
        }}
      </FirestoreDocument>
    </FirestoreProvider>
  );
};
