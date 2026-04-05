import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel("/user/" + userId).then((response) => {
      setUser(response.data);
    });
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {user.location}
      </Typography>
      <Typography variant="body1">
        <strong>Occupation:</strong> {user.occupation}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {user.description}
      </Typography>
      <Button
        component={Link}
        to={"/photos/" + userId}
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        View Photos
      </Button>
    </div>
  );
}

export default UserDetail;
