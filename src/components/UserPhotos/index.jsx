import React, { useState, useEffect } from "react";
import { Typography, Divider, Button } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Format a date string to a user-friendly format.
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}

/**
 * PhotoStepper - shows one photo at a time with prev/next.
 */
function PhotoStepper({ photos, userId }) {
  const { photoIndex: photoIndexParam } = useParams();
  const navigate = useNavigate();

  const currentIndex = photoIndexParam !== undefined
    ? Math.min(parseInt(photoIndexParam, 10), photos.length - 1)
    : 0;

  const handlePrev = () => {
    navigate("/photos/" + userId + "/" + (currentIndex - 1));
  };

  const handleNext = () => {
    navigate("/photos/" + userId + "/" + (currentIndex + 1));
  };

  if (photos.length === 0) {
    return <Typography variant="body1">No photos found.</Typography>;
  }

  const photo = photos[currentIndex];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <Button
          variant="outlined"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Typography variant="body2">
          Photo {currentIndex + 1} of {photos.length}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={currentIndex === photos.length - 1}
        >
          Next
        </Button>
      </div>

      <div style={{ marginBottom: 24 }}>
        <img
          src={"/images/" + photo.file_name}
          alt={photo.file_name}
          style={{ maxWidth: "100%", maxHeight: 400 }}
        />
        <Typography variant="body2" color="textSecondary">
          {formatDate(photo.date_time)}
        </Typography>

        {photo.comments && photo.comments.length > 0 && (
          <div style={{ marginTop: 8, marginLeft: 16 }}>
            <Typography variant="subtitle2">Comments:</Typography>
            {photo.comments.map((comment) => (
              <div key={comment._id} style={{ marginTop: 4 }}>
                <Typography variant="body2">
                  <Link to={"/users/" + comment.user._id}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>
                  {" — "}
                  {formatDate(comment.date_time)}
                </Typography>
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  {comment.comment}
                </Typography>
                <Divider style={{ marginTop: 4 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel("/photosOfUser/" + userId).then((response) => {
      setPhotos(response.data);
    });
  }, [userId]);

  if (photos.length === 0) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  // Advanced Features: show stepper
  if (advancedFeatures) {
    return <PhotoStepper photos={photos} userId={userId} />;
  }

  // Normal mode: show all photos
  return (
    <div>
      {photos.map((photo) => (
        <div key={photo._id} style={{ marginBottom: 24 }}>
          <img
            src={"/images/" + photo.file_name}
            alt={photo.file_name}
            style={{ maxWidth: "100%", maxHeight: 400 }}
          />
          <Typography variant="body2" color="textSecondary">
            {formatDate(photo.date_time)}
          </Typography>

          {photo.comments && photo.comments.length > 0 && (
            <div style={{ marginTop: 8, marginLeft: 16 }}>
              <Typography variant="subtitle2">Comments:</Typography>
              {photo.comments.map((comment) => (
                <div key={comment._id} style={{ marginTop: 4 }}>
                  <Typography variant="body2">
                    <Link to={"/users/" + comment.user._id}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    {" — "}
                    {formatDate(comment.date_time)}
                  </Typography>
                  <Typography variant="body2" style={{ marginLeft: 8 }}>
                    {comment.comment}
                  </Typography>
                  <Divider style={{ marginTop: 4 }} />
                </div>
              ))}
            </div>
          )}
          <Divider style={{ marginTop: 16 }} />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
