import React, { useState} from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";

const signup = (user, currentStatus, phoneNumber) => {
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
        phoneNumber: phoneNumber,
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
      phoneNumber: phonenumber,
      skillSet: "node",
      unit: "node",
      groupNum: 0,
    };
    return (
      <Redirect
        to={{
          pathname: "/Profile",
          currentUser: userObj,
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
          <div >
            <Form
              className="App"
              style={{ width: "35%", padding: 100, margin: "auto" }}
            >
              <h1 class="d-flex justify-content-center">Team up!</h1>
            <h6 class="d-flex justify-content-center">Mate, where's your group?</h6>
              <FormGroup>
                <label className="Cen">Email</label>
                <Input
                  className="form-control"
                  type="Email"
                  placeholder="Email"
                  onChange={(event) => {
                    setusername(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label className="Cen">First Name</label>
                <Input
                  className="form-control"
                  type="FirstName"
                  placeholder="First Name"
                  onChange={(event) => {
                    setfirstname(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label className="Cen">Last Name</label>
                <Input
                  className="form-control"
                  type="Last Name"
                  placeholder="Last Name"
                  onChange={(event) => {
                    setlastname(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label className="Cen">Phone Number</label>
                <Input
                  className="form-control"
                  type="Phone Number"
                  placeholder="Phone Number"
                  onChange={(event) => {
                    setphonenumber(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label className="Cen">Password</label>
                <Input
                  className="form-control"
                  type="Password"
                  placeholder="Password"
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                />
              </FormGroup>

              <Button
              type="submit"
              className="btn btn-primary btn-block"
              color='primary'
              style={{ width: "50%", margin:'auto' }}
                onClick={(event) =>{
                  event.preventDefault();
                  signup(
                    {
                      firstName: firstname,
                      lastName: lastname,
                      email: username,
                      password: password
                    },
                    currentStatus,
                    phonenumber
                  )
                }
                } >
                Sign Up
              </Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
};

export default SignUp;
