import React, {useState} from "react";
import Axios from "axios";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NearMeIcon from "@material-ui/icons/NearMe";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import "./Post.css";
import CommentModal from "./CommentModal";

function Post({ role, userEmail, postId, posterEmail, profilePic, image, userName, timeStamp, message, reportCount, likeCount, commentCount, userLikeStatus, handleLike, handleDelete }) {

    const [commentModal, setCommentModal ] = useState(false);

    const likePost = async (e) => {
      await Axios.post(`/addlike`, {email: userEmail, posteremail: posterEmail, PostId: postId })
        .then((response) => {
            handleLike(true)
        })
        .catch((error) => {
          // setLoading(false);
        });
    };

    const deletePost = async (e) => {
      await Axios.post(`/deletepost`, {email: userEmail, PostId: postId })
        .then((response) => {
            handleDelete(true)
        })
        .catch((error) => {
          // setLoading(false);
        });
    };

  return (
    <div className="post">
      <div className="post_top">
        <Avatar src={profilePic} className="post_avatar" />
        <div className="post_topInfo">
          <h3>{userName}</h3>
          {/* <p>{new Date(timeStamp?.toDate()).toUTCString()}</p> */}
          <p>{timeStamp}</p>
        </div>
      </div>

      <div className="post_bottom">
        <p>{message}</p>
      </div>

      <div className="post_image">
        <img src={image} alt="" />
      </div>

      <div className="post_options">
        <div className="post_option">
          <FavoriteIcon />
          <p>{likeCount}</p>
        </div>
        <div className="post_option" onClick={(e) => likePost(e)}>
          {userLikeStatus ? (
            <React.Fragment>
              <ThumbDownIcon />
              <p>DisLike</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ThumbUpIcon />
              <p>Like</p>
            </React.Fragment>
          )}
        </div>
        <div className="post_option" onClick={e => setCommentModal(true)}>
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        { role === 'admin' && <div className="post_option" onClick={(e) => deletePost(e)}>
          <DeleteIcon />
          <p>Delete</p>
        </div>}
      </div>
      <CommentModal commentModal={commentModal} setCommentModal={setCommentModal} postId={postId} />
    </div>
  );
}

export default Post;
