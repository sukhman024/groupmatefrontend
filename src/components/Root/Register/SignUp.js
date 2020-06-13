import React, { useState, seEffect, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";

const signup = (user, currentStatus) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Content-Type", "text/plain");

      var userObj = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: 1234,
        skillSet: "node",
        unit: "node",
        groupNum: 0,
      };

      fetch(`https://groupmateproject.herokuapp.com/user/signup`, {
        method: "post",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          
          currentStatus("user");
        });
    })
    .catch((err) => {
      console.log("signUp err passed data", err);
    });
};

const SignUp = () => {
  const [status, currentStatus] = useState(null);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  var [currentUser, setCurrentUser] = useState("");
  var [userlist, setuserlist] = useState("");

  if (status === "user") {
    var userObj = {
      firstName: firstname,
      lastName: lastname,
      email: username,
      phoneNumber: 1234,
      skillSet: "node",
      unit: "node",
      groupNum: 0,
    };
    setCurrentUser(userObj)
    return (
      <Redirect
        to={{
          pathname: "/Profile",
          currentUser: currentUser,
        }}
      />
    );
  } else {
    return (
      <div>
        {status !== null ? (
          <div>
            {status === "user" ? <Redirect to="/Profile" /> : <SignUp />}
          </div>
        ) : (
          <Form className="App">
            <h1 className="Cen">TeamUp Registration</h1>
            <h2 className="Cen">Enter Details</h2>
            <FormGroup>
              <label className="Cen">Email</label>
              <Input
                className="Username"
                type="Email"
                placeholder="Email"
                onChange={(event) => {
                  setusername(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label className="Cen">FirstName</label>
              <Input
                className="Username"
                type="FirstName"
                placeholder="FirstName"
                onChange={(event) => {
                  setfirstname(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label className="Cen">LastName</label>
              <Input
                className="Username"
                type="LastName"
                placeholder="LastName"
                onChange={(event) => {
                  setlastname(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label className="Cen">PhoneNumber</label>
              <Input
                className="Username"
                type="PhoneNumber"
                placeholder="PhoneNumber"
                onChange={(event) => {
                  setphonenumber(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label className="Cen">Password</label>
              <Input
                className="Password"
                type="Password"
                placeholder="Password"
                onChange={(event) => {
                  setpassword(event.target.value);
                }}
              />
            </FormGroup>

            <Button
              onClick={() =>
                signup(
                  {
                    firstName: firstname,
                    lastName: lastname,
                    email: username,
                    password: password,
                  },
                  currentStatus
                )
              }
              className="block"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </div>
    );
  }
};

export default SignUp;
