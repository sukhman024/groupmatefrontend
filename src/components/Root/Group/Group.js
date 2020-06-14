import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../styles/App.css";
import * as ReactBootStrap from "react-bootstrap";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { TextField } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

const AssignGroup = (cuser, groupdata, setgroup, groupNum) => {
  var groupmembers = [...groupdata];
  var element = {};
  var counter = 0;
  if (cuser.groupNum === 0 && groupNum=== 0 ) {
    alert("already unassigned");
  } else {
    for (let index = 0; index < groupmembers.length; index++) {
      element = groupmembers[index];
      if (element?.groupNum === groupNum && groupNum !==0) {
        counter++;
      }
    }
    console.log('counter==',counter)
    if (counter >= 3) {
      alert("Group already full");
    } else {
      for (let index = 0; index < groupmembers.length; index++) {
        element = groupmembers[index];
        if (element?.email === cuser?.email) {
          element.groupNum = groupNum;
          cuser.groupNum = groupNum;
        }
      }
      setgroup(groupmembers);
      updateMongo(element, groupNum, cuser);
    }
  }
};

function updateMongo(element, groupNum, cuser) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Content-Type", "text/plain");

  var userObj = {
    firstName: element.firstName,
    lastName: element.lastName,
    phoneNumber: element.phoneNumber,
    skillSet: element.skillSet,
    unit: element.unit,
    groupNum: groupNum,
  };
  
  let x = cuser.email;
  fetch(`https://groupmateproject.herokuapp.com/user/update/${x}`, {
    method: "put",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Updated data " + data);
    });
}

const Group = (props) => {
  const [status, currentStatus] = useState(null);
  const [redirect, setRedirect] = useState('');
  const [groupNum, setGroupNum] = useState(
    props.location.currentUser?.groupNum
  );
  console.log('props.location.currentUser==',props.location.currentUser)
  var [cuser, setcuser] = useState(props.location.currentUser);
  // const [userlist, setuserlist] = useState(props.location.userlist);
  const [groupdata, setgroup] = useState(props.location.userlist);

  const groupList = (item) => {
if(redirect==='profile'){
    return (<Redirect 
      to={{
        pathname: "/Profile",
        currentUser: cuser,
        userlist:groupdata
      }}
    />)
}else
    return (
      <TableContainer
      component={Paper}
      class="table"
      style={{paddingRight:60, paddingLeft:60, paddingTop:10}}
      >
        <Table
          aria-label="simple table"
        >
          <TableHead class="thead-light">
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Group Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupdata?.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.groupNum}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <React.Fragment>
      <h1 class="d-flex justify-content-center">Team up!</h1>
          <h6 class="d-flex justify-content-center"> Mate, where's your group?
          </h6>
          <h3 class="d-flex justify-content-center">Group</h3>
      <div>{groupList()}</div>
      
      <div style={{ margin: "auto", height: 300, width: 900, padding: 20 }}>
      
        <TextField
          style={{margin:20}}
          variant={"outlined"}
          value={groupNum}
          onChange={(event) => {
            setGroupNum(event.target.value);
          }}
        />
        <br/>
        <Button
          style={{ margin:20}}
          color='primary'
          onClick={() => AssignGroup(cuser, groupdata, setgroup, groupNum)}
          className="block"
        >
          JOIN
        </Button>
        <Button
          color='primary'
          style={{ margin:20}}
          onClick={() => {
            console.log('cuser==',cuser)
            AssignGroup(cuser, groupdata, setgroup, 0);
          }}
          className="block"
        >
          Leave
        </Button>
        <Button
          color='primary'
          style={{  margin:20}}
          onClick={() => {
            setRedirect('profile')
          }}
          className="block"
        >
          Profile
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Group;
