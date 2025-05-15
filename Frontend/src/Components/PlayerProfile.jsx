import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import ProfileImg from "../assets/users.jpg";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineWindow } from "react-icons/md";
import PlayerPosts from "./PlayerPosts";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const PlayerProfile = () => {
  const location = useLocation();
  const [refreshPosts, setRefreshPosts] = useState(false);

  const [profileData, setProfileData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user } = useContext(AuthContext);
  const token = user?.token;
  const role = user.role;

  console.log(role);

  useEffect(() => {
    if (location.state?.newPostAdded) {
      setRefreshPosts(true);
      window.history.replaceState({}, document.title);
    }
    fetchProfile();
  }, [location]);

  const fetchProfile = async () => {
    try {
      // const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://glory-scout.tryasp.net/api/UserProfile/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(res?.data);
      console.log(res?.data);

      setEditBio(res?.data.profileDescription || "");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editBio.trim()) {
      setSnackbar({
        open: true,
        message: "Please fill in the bio.",
        severity: "warning",
      });
      return;
    }

    const formData = new FormData();
    formData.append("ProfileDescription", editBio);
    if (selectedFile) {
      formData.append("newProfilePic", selectedFile);
    }

    setLoading(true);
    try {
      // const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://glory-scout.tryasp.net/api/UserProfile/edit-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        setSnackbar({
          open: true,
          message: "Profile updated successfully.",
          severity: "success",
        });
        setOpenEdit(false);
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="profile-container text-white  w-full"
      style={{ width: "90%" }}
    >
      <div className="row player-info ps-5 pt-5 d-flex align-items-center ">
        <div className="col-sm-12 col-md-3 col-lg-3">
          <h3>{profileData?.username}</h3>
          <img
            src={profileData?.profilePhoto || ProfileImg}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #ccc",
            }}
          />
        </div>

        <div className="info col-sm-12 col-md-4 col-lg-4 p-2 d-flex align-items-center justify-content-between text-center">
          <div>
            <p>Posts</p>
            <h6>{profileData?.posts?.length || 0}</h6>
          </div>
          <div>
            <p>Followers</p>
            <h6>{profileData?.followersCount || 0}</h6>
          </div>
          <div>
            <p>Following</p>
            <h6>{profileData?.followingCount || 0}</h6>
          </div>
        </div>
      </div>

      <div className="bio ps-5 pt-3">
      
        <p className="p-3">
          {profileData?.profileDescription ||
            "No bio available , please click edit profile to add bio"}
        </p>
      </div>

      <div className="row profile-btns ps-5">
        <div className="col-sm-12 col-md-4 mb-2">
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={'center'}
            justifyContent={'center'}
            gap={2}
            width="100%"
          >
            <Button
              variant="contained"
              onClick={() => setOpenEdit(true)}
              sx={{
                width: {
                  xs: "90%",
                   sm: "90%",
                  md: "80%",
                 
                  
                },
                margin:{
                  xs:'auto'
                },
                fontSize:{
                  md:"16px",
                  sm:'14px',
                  xxs:'14px'
                },
                padding: {
                  xs: " 7px 15px",
                  sm: "7px 15px ",
                  md: "2px 20px",
                },
                fontWeight: "bold",
                backgroundColor: "#e65100",
                color: "#fff",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#bf360c",
                },
              }}
            >
              Edit Profile
            </Button>
            <div className="col-sm-12 col-md-4 mb-2 d-flex justify-content-center align-items-center">
              <IoMdPersonAdd
                style={{
                  width: 60,
                  height: 30,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderRadius: 4,
                  padding: 5,
                }}
              />
            </div>
          </Box>
        </div>

        <Container sx={{ mt: 3 }} style={{marginLeft:"0px"}}>
          {/* Add post button */}

          <Link to="/upload" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#141414",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e65100",
                },
              }}
            >
              Add Post
            </Button>
          </Link>
        </Container>

        <div>
          <MdOutlineWindow style={{ width: 50, height: 100 }} />
        </div>
      
        <PlayerPosts
          refresh={refreshPosts}
          onRefreshed={() => setRefreshPosts(false)}
          isEditable={true}
        />
      </div>

      {/* Edit Profile Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: "#1e1e1e",
            color: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Bio"
            variant="outlined"
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            sx={{ mb: 2, input: { color: "#fff" }, label: { color: "#aaa" } }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ marginBottom: 16, color: "#fff" }}
          />

          <Button
            variant="contained"
            onClick={handleUpdateProfile}
            disabled={loading}
            fullWidth
            sx={{
              backgroundColor: "#00ff40",
              color: "#000",
              "&:hover": {
                backgroundColor: "#00cc33",
              },
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#000" }} />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default PlayerProfile;
