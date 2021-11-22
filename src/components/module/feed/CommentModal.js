/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import "./CommentModal.css";

function CommentModal({ commentModal, setCommentModal, postId }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);

    const displayComments = async () => {
      // setLoading(true);
      await Axios.get(`displayallcomments?email=${email}&PostId=${postId}`)
        .then((response) => {
          console.log(response.data);
          setAllComments(response.data);
        })
        .catch((error) => {});
    };
    displayComments();
    setCommentAdded(false);
  }, [commentAdded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input !== "") {
      try {
        await Axios.post("/addcomment", {
          email,
          PostId: postId,
          comment: input,
        }).then((response) => {
          // handleComments(true)
          setCommentAdded(true);
        });
      } catch (e) {}
    }
    setInput("");
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner={
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          visible={true}
        />
      }
    >
      <Modal show={commentModal} onHide={(e) => setCommentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="messageSender">
            <div className="messageSender_top">
              <form>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="messageSender_input"
                  type="text"
                  placeholder="Upto 1000 characters allowed"
                  maxLength="1000"
                />
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Post
                </button>
              </form>
            </div>
          </div>
            <div>
              {allComments
                .slice(0)
                .reverse()
                .map((comment) => {
                  return (
                    <div className="post" key={comment.comment_Id}>
                      <div className="post_top">
                        <Avatar className="post_avatar" />
                      </div>
                      <div className="post_bottom">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default CommentModal;
