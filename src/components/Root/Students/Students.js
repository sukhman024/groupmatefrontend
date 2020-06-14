import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../../../styles/App.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Link from "@material-ui/core/Link";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

const Students = (props) => {
  const [profileUser, setprofileUser] = useState(props.location.currentUser);
  const [studentslist, setSudentslist] = useState(props.location.userlist);
  const [redirect, setRedirect] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  if (redirect === "profile") {
    console.log('passing profile user', profileUser, props.location.currentUser)
    return (
      <Redirect
        to={{
          pathname: "/Profile",
          currentUser: currentUser,
          profileUser: profileUser,
          userlist:studentslist
        }}
      />
    );
  } else {
    return (
      <div>
        <React.Fragment>
        <h1 class="d-flex justify-content-center">Team up!</h1>
          <h6 class="d-flex justify-content-center"> Mate, where's your group?
          </h6>
          <div style={{paddingRight:60, paddingLeft:60, paddingTop:10}}>
          <h3 class="d-flex justify-content-center">Student list</h3>
          <TableContainer
            component={Paper}
            class="table"
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead class="thead-light">
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell >Last Name</TableCell>
                  <TableCell >Username</TableCell>
                  <TableCell >Group Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentslist?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell >{row.lastName}</TableCell>
                    <TableCell >
                      <Link href="#" onClick={()=>{
                        setCurrentUser(row)
                        setRedirect('profile')
                      }}>
                        {row.email}
                      </Link>
                    </TableCell>
                    <TableCell >{row.groupNum}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </React.Fragment>
      </div>
    );
  }
};

export default Students;
