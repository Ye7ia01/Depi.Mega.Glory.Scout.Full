import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegComment, FaSpinner } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PostDetails = () => {
  const { postId } = useParams();
  const { user, authenticated } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!authenticated || !user?.token) return;
      
      try {
        setIsLoading(true);
        const response = await axios.get(`http://glory-scout.tryasp.net/api/Post/${postId}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.status === 200) {
          setPost(response.data);
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
        toast.error("Failed to load post details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [authenticated, user?.token, postId]);

  // Handle like functionality
  const handleLikeClick = async () => {
    if (!authenticated || !user?.token || !post) return;

    try {
      const url = `http://glory-scout.tryasp.net/api/Post/${postId}/like`;
      const method = post.isLikedByCurrentUser ? 'delete' : 'post';
      
      await axios({
        method,
        url,
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      });
      
      // Update post state
      setPost(prevPost => ({
        ...prevPost,
        isLikedByCurrentUser: !prevPost.isLikedByCurrentUser,
        likesCount: prevPost.likesCount + (prevPost.isLikedByCurrentUser ? -1 : 1)
      }));
      
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      toast.error("Failed to update like status");
    }
  };

  // Post a new comment
  const postComment = async () => {
    if (!authenticated || !user?.token || !newComment.trim()) return;
    
    try {
      const response = await axios.post(
        `http://glory-scout.tryasp.net/api/Post/${postId}/comment`,
        { commentText: newComment },
        {
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Comment posted successfully");
        setNewComment("");
        
        // Refresh post details to get updated comments
        const updatedPostResponse = await axios.get(`http://glory-scout.tryasp.net/api/Post/${postId}`, {
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json"
          }
        });
        
        if (updatedPostResponse.status === 200) {
          setPost(updatedPostResponse.data);
          setComments(updatedPostResponse.data.comments);
        }
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment");
    }
  };

  // Delete a comment
  const deleteComment = async (commentId) => {
    if (!authenticated || !user?.token) {
      toast.error("You need to be logged in to delete comments");
      return;
    }
    
    try {
      console.log("Attempting to delete comment ID:", commentId);
      
      const response = await axios.delete(`http://glory-scout.tryasp.net/api/comments/${commentId}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        }
      });
      
      console.log("Delete response:", response);
      
      if (response.status === 200 || response.status === 204) {
        toast.success("Comment deleted successfully");
        
        // Update comments list
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        
        // Update post comment count
        setPost(prevPost => ({
          ...prevPost,
          commentsCount: prevPost.commentsCount - 1
        }));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(`Failed to delete comment: ${error.response?.data?.message || error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <FaSpinner className="loading-login" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-not-found" style={{
        textAlign: "center",
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: "800px"
      }}>
        <h2>Post not found or still loading...</h2>
        <Link to="/home" className="back-button" style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px"
        }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="post-details-container" style={{
      padding: "2rem",
      margin: "0 auto",
      maxWidth: "800px"
    }}>
      <div className="post-header" style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem"
      }}>
        <Link to=""   onClick={() => navigate(-1)} className="back-button" style={{
          marginRight: "1rem",
          color: "#007bff",
          textDecoration: "none"
        }}>← Back to Home</Link>
      </div>

      <div className="post-card" style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "2rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <div className="user-info" style={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #eee"
        }}>
          <img 
            src={post.user?.profilePhoto} 
            alt="User" 
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "1rem"
            }}
          />
          <div>
            <h3 style={{ margin: "0", fontSize: "1rem" }}>{post.user?.username}</h3>
            <p style={{ margin: "0", color: "#666", fontSize: "0.8rem" }}>
              @{post.user?.username} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="post-image" style={{ width: "100%" }}>
          <img 
            src={post.postUrl} 
            alt="Post" 
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
          />
        </div>

        <div className="post-actions" style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
          borderTop: "1px solid #eee",
          borderBottom: "1px solid #eee"
        }}>
          <button 
            onClick={handleLikeClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: post.isLikedByCurrentUser ? "red" : "#333"
            }}
          >
            <CiHeart size={22} /> {post.likesCount || 0}
          </button>
          <button 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            <FaRegComment /> {post.comments?.length || 0}
          </button>
          <button 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            <PiShareFat /> 0
          </button>
        </div>

        <div className="post-description" style={{ padding: "1rem" }}>
          <p><strong>{post.user?.username}:</strong> {post.description}</p>
        </div>
      </div>

      <div className="comments-section" style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>Comments ({comments.length})</h2>
        
        <div className="new-comment" style={{
          padding: "1rem",
          borderBottom: "1px solid #eee",
          display: "flex",
          gap: "1rem"
        }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            style={{
              flex: "1",
              padding: "0.75rem",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
          <button
            onClick={postComment}
            disabled={!newComment.trim()}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: newComment.trim() ? "pointer" : "not-allowed",
              opacity: newComment.trim() ? 1 : 0.7
            }}
          >
            Post
          </button>
        </div>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div 
                key={comment.id} 
                className="comment"
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  gap: "1rem"
                }}
              >
                <img
                  src={comment.user?.profilePhoto}
                  alt="User"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%"
                  }}
                />
                <div style={{ flex: "1" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.25rem"
                  }}>
                    <strong>{comment.user?.username}</strong>
                    <small style={{ color: "#666" }}>
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </small>
                  </div>
                  <p style={{ margin: "0" }}>{comment.commentedText}</p>
                  
                  <button
                    onClick={() => deleteComment(comment.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#dc3545",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: "1rem", textAlign: "center", color: "#666" }}>
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;