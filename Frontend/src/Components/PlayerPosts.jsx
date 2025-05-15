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
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PlayerPosts = ({ isEditable, playerId, onDataLoaded }) => {
  const { user } = useContext(AuthContext);

  const token = user?.token;

  const [posts, setPosts] = useState([]);
  const [postsNumber, setpostsNumber] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    postId: null,
  });

  const navigate = useNavigate();


  useEffect(() => {
    fetchPosts();
  }, [playerId]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const url = isEditable
        ? `http://glory-scout.tryasp.net/api/UserProfile/get-profile`
        : `http://glory-scout.tryasp.net/api/SearchPages/get-profile/${playerId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(playerId, isEditable);
      setPosts(response?.data.posts || []);
    
      setpostsNumber(response?.data.posts.length);
      console.log("response from posts", response?.data);

      console.log("posts number:", postsNumber);
       console.log("followers count from posts",response?.data.followersCount);
       
      if (onDataLoaded) {
        onDataLoaded({
          postsCount: response?.data.posts.length,
          followersCount: response?.data.followersCount || 0,
          isFollowing: response?.data.isFollowing,
        });
      }
    } catch (err) {
      setError("Failed to load posts. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `http://glory-scout.tryasp.net/api/UserProfile/delete-post/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnackbar({
        open: true,
        message: "Post deleted successfully!",
        severity: "success",
      });
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete post.",
        severity: "error",
      });
    }
    setDeleteDialog({ open: false, postId: null });
  };

  



  const renderMedia = (fileUrl) => {
    const ext = new URL(fileUrl).pathname.split(".").pop().toLowerCase();

    if (["mp4", "mov", "avi"].includes(ext)) {
      return (
        <CardMedia
          component="video"
          src={fileUrl}
          controls
          sx={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      );
    } else if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      return (
        <CardMedia
          component="img"
          src={fileUrl}
          alt="Post"
          sx={{ width: "100%", height: 200, objectFit: "cover" }}
        />
      );
    }
    return <Typography color="text.secondary">Unsupported media</Typography>;
  };

  const toggleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (loading) {
    return (
      <Box
        minHeight="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
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
    <Container maxWidth="xl" sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: "#fff", marginBlock: "20px" }}
      >
        Posts :
      </Typography>
       
      {posts?.length === 0 ? (
        <Typography variant={"p"} style={{ color: "#fff", fontSize: "18px" }}>
          No posts yet...
        </Typography>
      ) : (
        <Grid container spacing={3} display="flex">
          {posts?.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={post.id}
              sx={{ width: { xs: "100%", sm: "80%", md: "48%", lg: "31%" }  }
             
            }
            >
              <Card
               
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                  cursor: "pointer",
                }}
              >
                <Box sx={{ width: "100%", height: 200, overflow: "hidden" }}
                  onClick={() => navigate(`/posts/${post.id}`)}
                >
                  {renderMedia(post.posrUrl)}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ position: "relative" }}>
                    <Typography
                      variant="body1"
                      textAlign="start"
                      pr="10px"
                      ref={(el) => {
                        if (
                          el &&
                          post.description.length > 100 &&
                          !expandedPosts[post.id]
                        ) {
                          el.dataset.truncated = "true";
                        }
                      }}
                      sx={{
                        display: expandedPosts[post.id]
                          ? "block"
                          : "-webkit-box",
                        WebkitLineClamp: expandedPosts[post.id] ? "none" : 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.description}
                    </Typography>

                    {post.description.length > 100 && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#90caf9",
                          cursor: "pointer",
                          mt: 1,
                          width: "fit-content",
                        }}
                        onClick={() => toggleExpand(post.id)}
                      >
                        {expandedPosts[post.id] ? " Less..." : "Read more...."}
                      </Typography>
                    )}
                  </Box>
                  {isEditable ? (
                    <Box
                      mt={2}
                      display="flex"
                      gap={2}
                      sx={{
                        flexDirection: {
                          xs: "column",
                          sm: "row",
                        },
                        alignItems: {
                          xs: "stretch",
                          sm: "center",
                        },
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontSize: {
                            xxs: "12px",
                            xs: "0.8rem",
                            sm: "14px",
                            lg: "14px",
                          },
                          padding: {
                            xxs: "5px 10px",
                            xs: "6px 12px",
                            sm: "0px 7px",
                            md: "0px 3px",
                            lg: " 0px 7px",
                          },
                          "@media (max-width: 1086px)": {
                            fontSize: "0.9rem",
                            padding: "6px 10px",
                          },
                        }}
                        onClick={() => navigate("/upload", { state: { post } })}
                      >
                        Update Post
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          fontSize: {
                            xxs: "12px",
                            xs: "0.8rem",
                            sm: "14px",
                            lg: "14px",
                          },
                          padding: {
                            xxs: "5px 10px",
                            xs: "6px 12px",
                            sm: "0px 7px",
                            md: "0px 7px",
                            lg: " 0px 7px",
                          },
                          "@media (max-width: 1086px)": {
                            fontSize: "0.9rem",
                            padding: "6px 10px",
                          },
                        }}
                        onClick={() =>
                          setDeleteDialog({ open: true, postId: post.id })
                        }
                      >
                        Delete Post
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />

      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, postId: null })}
      >
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, postId: null })}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteDialog.postId)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlayerPosts;
