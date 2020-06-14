import React, { useState, seEffect, useEffect } from "react";
import "../../../styles/App.css";
import "../../../styles/index.css";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
import { Link } from "@material-ui/core";

const SignIn = () => {
  const [status, currentStatus] = useState(null);
  var [currentUser, setCurrentUser] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [userlist, setuserlist] = useState("");

  //New user added
  let [loggedInUser, setLoggedInUser] = useState();

  const SignInUser = async (username, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((data) => {
        setLoggedInUser(data);
        setCurrentUserForRedirect(username).catch((err) => {
          alert("Failed to login", err);
        });
      });
  };

  const setCurrentUserForRedirect = async (username) => {
    fetch(`https://groupmateproject.herokuapp.com/user/userbyemail/`, {
      method: "post",
      body: JSON.stringify({ email: username }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data.response);
        currentStatus("user");
      });
  };

  if (status === "user") {
    return (
      <Redirect
        to={{
          pathname: "/Profile",
          currentUser: currentUser,
          userlist: userlist,
        }}
      />
    );
  } else if (status === "signup") {
    return <Redirect to="/signup" />;
  } else {
    return (
      <div >
        <form style={{ width: "35%", padding: 100, margin: "auto" }}>
          <div style={{padding:'5%' }} >
            <h1 class="d-flex justify-content-center">Team up!</h1>
            <h6 class="d-flex justify-content-center">Mate, where's your group?</h6>
          </div>
          <h4>Sign In</h4>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => {
                setusername(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => {
                setpassword(event.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ width: "50%" }}
            onClick={(event) => {
              event.preventDefault();
              SignInUser(username, password);
            }}
          >
            Submit
          </button>
          <br />
          <p className="forgot-password text-center">
            Dont have an account? <Link style={{color:'blue'}} type={'button'} onClick={() => {
              currentStatus("signup");
            }}>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
};

export default SignIn;
