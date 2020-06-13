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
          <h1 className="Cen">Student list</h1>
          <TableContainer
            component={Paper}
            style={{ width: "50rem", height: "50rem", margin: "auto" }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Group Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentslist?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.firstName}
                    </TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">
                      <Link href="#" onClick={()=>{
                        setCurrentUser(row)
                        setRedirect('profile')
                      }}>
                        {row.email}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.groupNum}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </div>
    );
  }
};

export default Students;
