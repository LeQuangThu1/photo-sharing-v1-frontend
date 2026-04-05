import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ advancedFeatures, onToggleAdvanced }) {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const match = location.pathname.match(/\/(users|photos)\/([^/]+)/);
    if (!match) {
      setContextText("");
      return;
    }

    const section = match[1];
    const userId = match[2];

    fetchModel("/user/" + userId).then((response) => {
      const user = response.data;
      if (!user) {
        setContextText("");
        return;
      }
      if (section === "users") {
        setContextText(user.first_name + " " + user.last_name);
      } else if (section === "photos") {
        setContextText("Photos of " + user.first_name + " " + user.last_name);
      }
    }).catch(() => {
      setContextText("");
    });
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Lê Quang Thu
        </Typography>
        {contextText && (
          <Typography variant="h6" color="inherit" sx={{ marginRight: 2 }}>
            {contextText}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={!!advancedFeatures}
              onChange={onToggleAdvanced}
              sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
            />
          }
          label={
            <Typography variant="body2" color="inherit">
              Enable Advanced Features
            </Typography>
          }
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
