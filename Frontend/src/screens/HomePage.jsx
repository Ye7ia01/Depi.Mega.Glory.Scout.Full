import {WiStars} from "react-icons/wi";
import {Link} from 'react-router-dom';
import {FaRegComment, FaSpinner} from "react-icons/fa";
import {PiShareFat} from "react-icons/pi";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {formatDistanceToNow} from 'date-fns';
import useGetPlayersScouts from "../API/players/useGetPlayersScouts";
import {CiHeart} from "react-icons/ci";
import toast from "react-hot-toast";

const HomePage = () => {
    const {user, authenticated} = useContext(AuthContext);
    const [showComments, setShowComments] = useState(false);
    const [post, setPost] = useState(false)
    const [comment, setComment] = useState(false);
    const [getData, setData] = useState(null);
    // const {isLoading} = useGetPlayersScouts();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (authenticated && user?.token) {
                try {
                    setIsLoading(true);
                    const response = await axios.get('http://glory-scout.tryasp.net/api/HomePage/feed', {
                        headers: {
                            "Authorization": `Bearer ${user.token}`,
                            "Content-Type": "application/json"
                        }
                    });
                    setIsLoading(false);
                    console.log(response.data);
                    setData(response.data.posts);
                } catch (err) {
                    console.error("Error fetching data:", err);
                }
            }
        };

        fetchData();
    }, [authenticated, user?.token, comment]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" && showComments) {
                setShowComments(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showComments]);

    const postComment = async (postId, comment) => {
        console.log("Clicked Comment , Post ID:", postId);
        if (!authenticated || !user?.token) return;
        console.log("Starting Request")
        try {
            const response = await axios.post(`http://glory-scout.tryasp.net/api/Post/${postId}/comment`,
                {
                    commentText: comment.toString()
                },
                {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                });
            console.log("Response : ", response)
            if (response.status === 200 || response.status === 201) {
                toast.success("Comment Posted Successfully");
                setShowComments(false);
                setComment(false);
            }
        } catch (error) {
            console.log("Error fetching comments:", error);
            toast.error("Error Posting Comment");
        }
    }


    const handleCommentClick = async (postId) => {

        console.log("Clicked Comment , Post ID:", postId);
        if (!authenticated || !user?.token) return;
        console.log("Starting Request")
        try {
            const response = await axios.get(`http://glory-scout.tryasp.net/api/Post/${postId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    }
                });
            console.log("Response : ", response)
            if (response.status === 200) {
                console.log("Post:", response.data);
                setPost(response.data);
                setShowComments(true);
            }
        } catch (error) {
            console.log("Error fetching comments:", error);
            toast.error("Error fetching comments");
        }
    }

    // This part handles the like functionality
    const handleLikeClick = async (postId, isLikedByCurrentUser) => {
        if (!authenticated || !user?.token) return;

        try {
            const url = `http://glory-scout.tryasp.net/api/Post/${postId}/like`;
            const method = isLikedByCurrentUser ? 'delete' : 'post';
            await axios({
                method,
                url,
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                }
            });
            setData(prevData =>
                prevData.map(e =>
                    e.id === postId
                        ? {
                            ...e,
                            isLikedByCurrentUser: !isLikedByCurrentUser,
                            likesCount: e.likesCount + (isLikedByCurrentUser ? -1 : 1)
                        }
                        : e
                )
            );
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    return (
        <div>
            {/* {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '3rem',
                    zIndex: 1000,
                }}>
                    <FaSpinner className="loading-login"/>
                </div>)} */}
            <div className="hero-homepage">
                <div className="container">
                    <div className="cards">
                        <div className="text">
                            <h1><Link to="/home">Home</Link></h1>
                            <button><WiStars/></button>
                        </div>
                        {getData?.map((e, index) => {
                            const timeAgo = formatDistanceToNow(new Date(e.createdAt), {addSuffix: true});
                            return (
                                <div className="cardx" key={index}>
                                    <div className="detalis-profile">
                                        {/* to={`/home/player/${e.userId}`} */}
                                        <Link to={``}><img src={e.userProfilePicture} alt=""/></Link>
                                        <h3>{e.username}</h3>
                                        <h4>@{e.username}</h4>
                                        <p>{timeAgo}</p>
                                    </div>
                                    <div className="box-img">
                                        <img src={e.posrUrl} alt=""/>
                                    </div>
                                    <div className="icons">
                                        <div className="cent">
                                            <button onClick={() => handleLikeClick(e.id, e.isLikedByCurrentUser)}
                                                    style={{
                                                        color: e.isLikedByCurrentUser ? 'red' : 'white',
                                                        fontSize: "22px"
                                                    }}>
                                                <CiHeart/> <span> {e.likesCount}</span>
                                            </button>
                                            <button onClick={() => {

                                                handleCommentClick(e.id);
                                            }}><FaRegComment/> <span>{e.commentsCount}</span></button>
                                            <button><PiShareFat/> <span>0</span></button>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <h3>{e.username}: </h3>
                                        <p><p>{e.description}</p></p>
                                    </div>
                                    {/*Show Comments Modal*/}
                                    {showComments && post && (
                                        <div
                                            className="modal"
                                            style={{
                                                display: "block",
                                                height: "100vh",
                                                width: "60%",
                                                margin: "auto",
                                                alignSelf: "center",
                                                zIndex: 1000, // Ensure it's above the overlay
                                                position: "fixed",
                                                left: "50%",
                                                top:"50%",
                                                transform: "translate(-50%, -50%)",
                                                // padding: '20px',
                                                
                                                overflowY: "auto",  // Allow scrolling for content
                                            }}
                                        >
                                            <button
                                                onClick={ () => {
                                                    setShowComments(false);
                                                    console.log("Pressed Close",showComments);
                                                    }
                                                }
                                                style={{
                                                    position: "absolute",
                                                    top: "20px",
                                                    right: "20px",
                                                    background: "transparent",
                                                    border: "none",
                                                    fontSize: "1.5rem",
                                                    cursor: "pointer",
                                                    zIndex: 2000,
                                                    overflow: "auto",
                                                }}
                                            >
                                                &times;
                                            </button>
                                            <div
                                                className="modal-content"
                                                style={{ display: "flex", flexDirection: "column", position: "relative" }}
                                            >
                                                {/* Existing modal content */}
                                                <div className="detalis-profile">
                                                    {/* to={`/home/player/${e.userId}`} */}
                                                    <Link><img src={post.user.profilePhoto} alt=""/></Link>
                                                    <h3 style={{color:'black', fontWeight:'bolder', fontSize:'16px', fontFamily:'Open Sans, sans-serif'}}>{post.user.username}</h3>
                                                    <h4>@{e.username}</h4>
                                                    <p>{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
                                                </div>

                                                <img
                                                    src={post.postUrl}
                                                    alt="Post"
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "50vh",
                                                        marginBottom: "1rem",
                                                    }}
                                                />
                                                <hr />
                                                <div className="comments-section">
                                                    <h3 style={{ textAlign: "center" }}>Comments</h3>
                                                    {post.comments.map((comment, index) => (
                                                        <div key={index}>
                                                            <div className={"d-flex flex-row align-items-top"}>
                                                                <img
                                                                    src={comment.user.profilePhoto}
                                                                    alt="User"
                                                                    width={"50px"}
                                                                    height={"50px"}
                                                                    style={{ borderRadius: "50%" }}
                                                                />
                                                                <div className={"comment-card"}>
                                                                    <div className={"d-flex flex-row details-profile"}>
                                                                        <p className={"comment-user"} >{comment.user.username}</p>
                                                                        <p className={"comment-period"}>
                                                                            {formatDistanceToNow(new Date(comment.createdAt), {
                                                                                addSuffix: true,
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                    <p>{comment.commentedText}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* New fixed div at the bottom */}
                                                <div
                                                    className="modal-footer"
                                                    style={{
                                                        position: "sticky",
                                                        bottom: 0,
                                                        backgroundColor: "#fff",
                                                        padding: "10px",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: "10px",
                                                        alignItems: "center",
                                                        borderTop: "1px solid #ccc",
                                                    }}
                                                >
                                                    <input
                                                        onChange={(event) => {
                                                            setComment(event.target.value)
                                                        }}
                                                        type="text"
                                                        placeholder="Write a comment..."
                                                        style={{
                                                            flex: 1,
                                                            padding: "10px",
                                                            borderRadius: "5px",
                                                            border: "1px solid #ccc",
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            postComment(post.id,comment)
                                                        }}
                                                        style={{
                                                            padding: "10px 20px",
                                                            borderRadius: "5px",
                                                            backgroundColor: "#007bff",
                                                            color: "#fff",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        Post
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
