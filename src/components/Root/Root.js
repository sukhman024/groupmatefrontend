import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn/index";
import SignUp from "./Register/index";
import MyProfile from "./Profile/index";
import Group from "./Group";
import Students from "./Students";

const Root = () => {
  return (
    <div>
      <Switch>
        <Route component={Home} path="/Home" />
        <Route component={MyProfile} path="/Profile" />
        <Route component={Group} path="/Group"/>
        <Route component={Students} path="/Students"/>
        <Route component={SignUp} path="/signup" />
        <Route component={SignIn} exact path="/" />
      </Switch>
    </div>
  );
};

export default Root;
