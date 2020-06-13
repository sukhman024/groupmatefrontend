import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import * as firebase from "firebase";
import { firebaseConfig } from "./FirebaseConfig";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById("root")
);