import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("/user/list").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <List component="nav">
      {users.map((user) => (
        <React.Fragment key={user._id}>
          <ListItem
            component={Link}
            to={"/users/" + user._id}
          >
            <ListItemText primary={user.first_name + " " + user.last_name} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default UserList;
