import React, { useState, seEffect, useEffect } from "react";
import "../../../styles/App.css";
import "../../../styles/index.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";

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
        setLoggedInUser(data)
        setCurrentUserForRedirect(username)
      .catch((err) => {
        alert("Failed to login",err)
      });
  });
};


  const setCurrentUserForRedirect = async (username) => {
    fetch(`https://groupmateproject.herokuapp.com/user/userbyemail/`, {
      method: "post",
      body: JSON.stringify({email:username}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json())
    .then(data => {
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
      <div>
        <Form className="App">
          <h1 className="Cen">Teamup USER LOGIN</h1>
          <h2 className="Cen">Enter Details</h2>
          <FormGroup>
            <label className="Cen">Username</label>
            <Input
              className="Username"
              type="Username"
              placeholder="Username"
              onChange={(event) => {
                setusername(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">Password</label>
            <Input
              className="Password"
              // type="Password"
              placeholder="Password"
              onChange={(event) => {
                setpassword(event.target.value);
              }}
            />
          </FormGroup>
          <div className="Left">
            <a href="/forgot-password">Forgot Password</a>
          </div>
          <Button
            onClick={() => {
              SignInUser(username, password);
            }}
            className="block"
          >
            Log in
          </Button>
          <Button
            onClick={() => {
              currentStatus("signup");
            }}
            className="block"
          >
            Sign up
          </Button>
        </Form>
      </div>
    );
  }
};

export default SignIn;
