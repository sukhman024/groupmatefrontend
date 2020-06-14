import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

const updateProfileToMongo = (data, setcurrentUser, setUserlist) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "text/plain");

  var userObj = {
    firstName: data.firstname,
    lastName: data.lastname,
    phoneNumber: data.phonenumber,
    skillSet: data.skillset,
    unit: data.unit,
    groupNo:data.groupNo,
    userEmail:data.userEmail
  };
  
  let x = data.userEmail;
  fetch(`https://groupmateproject.herokuapp.com/user/update/${x}`, {
    method: "put",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setcurrentUser(userObj);
      fetch("https://groupmateproject.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUserlist(data.response));
    });
};

const MyProfile = (props) => {
  const [locationAPI, setlocationAPI] = useState(null);
  const [currentUser, setcurrentUser] = useState(props.location.currentUser);
  const [profileUser, setprofileUser] = useState(props.location.profileUser);
  const [groupNo, setGroupNo] = useState(props.location.currentUser?.groupNum);
  const [content, setContent] = useState('');
  const [firstname, setfirstname] = useState(
    props.location.currentUser?.firstName
  );
  const [lastname, setlastname] = useState(
    props.location.currentUser?.lastName
  );
  const [phonenumber, setphonenumber] = useState(
    props.location.currentUser?.phoneNumber
  );
  const [skillset, setskillset] = useState(
    props.location.currentUser?.skillSet
  );
  const [unit, setunit] = useState(props.location.currentUser?.unit);
  const [redirection, setredirection] = useState("");
  const [userEmail, setUserEmail] = useState(props.location.currentUser?.email);
  const [userlist, setUserlist] = useState(props.location.userlist);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((result) => {
        setlocationAPI(result);
      });

    fetch("https://groupmateproject.herokuapp.com/user")
      .then((res) => res.json())
      .then((data) => setUserlist(data.response));
  }, []);

  const sendSMS = (content) => {
    fetch(`https://groupmateproject.herokuapp.com/user/sendsms/`, {
      method: "post",
      body: JSON.stringify({
        content: content
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data received, sms sent");
      });
  };

  if (redirection === "Group") {
    return (
      <Redirect
        to={{
          pathname: "/Group",
          userlist: userlist,
          currentUser: props.location.currentUser,
        }}
      />
    );
  } else if (redirection == "Students") {
    return (
      <Redirect
        to={{
          pathname: "/Students",
          userlist: userlist,
          currentUser: props.location.currentUser,
        }}
      />
    );
  } else {
    return (
      <div style={{height:'100rem'}}>
        <Form
          className="App"
          style={{ width: "35%", padding: 50, margin: "auto" }}
        >
          <h1 class="d-flex justify-content-center">Team up!</h1>
          <h6 class="d-flex justify-content-center">
            Mate, where's your group?
          </h6>
          <FormGroup>
            <label className="Cen">GroupNo</label>
            <Input
              className="Username"
              type="GroupNo"
              placeholder="GroupNo"
              value={groupNo}
              onChange={(event) => {
                setGroupNo(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">FirstName</label>
            <Input
              className="Username"
              type="FirstName"
              placeholder="FirstName"
              value={firstname}
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
              value={lastname}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">City</label>
            <Input
              className="Username"
              placeholder="City"
              value={locationAPI?.city}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">State</label>
            <Input
              className="Username"
              placeholder="State"
              value={locationAPI?.region}
              onChange={(event) => {
                setlastname(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">PhoneNumber</label>
            <Input
              className="Username"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(event) => {
                setphonenumber(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">Skillset</label>
            <Input
              className="Username"
              type="Skillset"
              placeholder="Skillset"
              value={skillset}
              onChange={(event) => {
                setskillset(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label className="Cen">Unit</label>
            <Input
              className="Username"
              type="Unit"
              placeholder="Unit"
              value={unit}
              onChange={(event) => {
                setunit(event.target.value);
              }}
            />
          </FormGroup>
          <div >
                {profileUser && (
                  <Input
                  type="text"
                  placeholder="SMS Content"
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                />
                )}
              </div>
          <div class="container">
            <div class="row">
              <div>
                {
                  !profileUser && (
                    <Button
                  color="primary"
                  style={{ margin: 20, width:100 }}
                  onClick={() =>
                    updateProfileToMongo({
                      groupNo,
                      firstname,
                      lastname,
                      phonenumber,
                      skillset,
                      unit,
                      userEmail,
                    },
                    setcurrentUser
                    ,setUserlist)
                  }
                  className="col btn btn-primary btn-lg"
                >
                  Update
                </Button>
                  )
                  }
              </div>

              <div >
                <Button
                  style={{ margin: 20, width:100 }}
                  color="primary"
                  className="col btn btn-primary btn-lg"
                  onClick={() => setredirection("Group")}
                >
                  Group
                </Button>
              </div>
              <div>
                <Button
                  style={{ margin: 20, width:100 }}
                  color="primary"
                  className="col btn btn-primary btn-lg"
                  onClick={() => setredirection("Students")}
                >
                  List
                </Button>
              </div>
              <div s>
                {profileUser && (
                  <Button
                    style={{ margin: 20, width:100 }}
                    color="primary"
                    className="col btn btn-primary btn-lg"
                    onClick={() => sendSMS(content)}
                  >
                    Send SMS
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
};

export default MyProfile;
