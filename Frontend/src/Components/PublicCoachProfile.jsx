import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Button,
  Snackbar,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayerPosts from "./PlayerPosts";
import { AuthContext } from "../context/AuthContext.jsx";
const PublicCoachProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const token = user?.token;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setuserId] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (id && token) fetchProfile();
  }, [id, token]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://glory-scout.tryasp.net/api/SearchPages/scouts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("coach profile", response);
      setProfile(response?.data);
      setuserId(response?.data?.userId);

      console.log("id", id);
      console.log("userId", userId);

      // profile.userId -> Call /get-profile/{userId} : posts , followers

      setIsFollowing(response?.data?.isFollowing || false);
    } catch (err) {
      setError("Failed to load profile.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async () => {
  

    try {
      const url = isFollowing
        ? `http://glory-scout.tryasp.net/api/UserProfile/unfollow/${userId}`
        : `http://glory-scout.tryasp.net/api/UserProfile/follow/${userId}`;
      const res = await axios.post(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response from followers", res);
        console.log("is following after", isFollowing);
      const newFollowing = !isFollowing;
      setIsFollowing(newFollowing);
      setFollowersCount((prev) => (newFollowing ? prev + 1 : prev - 1));

     
      setSnackbar({
        open: true,
        message: isFollowing
          ? "Unfollowed successfully."
          : "Followed successfully.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Action failed.",
        severity: "error",
      });
    }
  };
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }} display="flex" className="profile-container">
      <Typography variant="h4" sx={{ color: "white" }}>
        {profile.userName}
      </Typography>
      <Box display="flex" alignItems="center" gap={4} ml={3} mt={2}>
        {/* صورة البروفايل */}
        {profile?.profilePhoto && (
          <CardMedia
            component="img"
            image={profile.profilePhoto}
            alt="Profile media"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
        )}

        {/* Posts & Followers */}
        <Box display="flex" gap={4}>
          {/* Posts */}
          <Box textAlign="center">
            <Typography variant="subtitle1" color="#3aff33">
              Posts
            </Typography>
            <Typography variant="h6" color="white">
              {postCount}
            </Typography>
          </Box>

          {/* Followers */}
          <Box textAlign="center">
            <Typography variant="subtitle1" color="#3aff33">
              Followers
            </Typography>
            <Typography variant="h6" color="white">
              {followersCount}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={"20px"}
        marginBlock={"30px"}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            "&:hover": {
              color: "#e65100",
            },
            cursor: "pointer",
          }}
        >
          {profile.nationality}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            "&:hover": {
              color: "#e65100",
            },
            cursor: "pointer",
          }}
        >
          {profile.currentClubName}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            "&:hover": {
              color: "#e65100",
            },
            cursor: "pointer",
          }}
        >
          {profile.specialization}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            "&:hover": {
              color: "#e65100",
            },
            cursor: "pointer",
          }}
        >
          {profile.coachingSpecialty}
        </Typography>
        <Typography
          variant="h6"
          color="white"
          sx={{
            fontSize: { xs: "14px", sm: "16px", md: "20px" },
            "&:hover": {
              color: "#e65100",
            },
            cursor: "pointer",
          }}
        >
          {profile.experience} year exper.
        </Typography>
      </Box>
      {/* Buttons */}
      {profile?.userId && id && String(profile?.userId) !== String(id) && (
        <Box display="flex" gap={2} mt={2} marginLeft={"30px"}>
          <Button
            variant="contained"
            color={isFollowing ? "error" : "primary"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      )}
      <PlayerPosts
        isEditable={false}
        playerId={userId}
        onDataLoaded={({ postsCount, followersCount,isFollowing }) => {
          setPostCount(postsCount);
          setFollowersCount(followersCount);
          setIsFollowing(isFollowing);
        }}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default PublicCoachProfile;
