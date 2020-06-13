import React, { useState, useEffect } from "react";
import MyProfile from "../Profile/MyProfile";
//import ViewProfiles from "./ViewProfiles.js";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export default () => {
  const classes = useStyles();
  const [status, currentStatus] = useState(null);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                TeamUp
              </Typography>
              <Button color="inherit">Logout</Button>
            </Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Groups" />
              <Tab label="MyProfile" />
              <Tab label="ViewProfiles" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyProfile />
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <ViewProfiles /> */}
          </TabPanel>
        </div>
  );
};
