import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import Post from "../feed/Post"


function ViewMyPostModal({ viewMyPostModal, setViewMyPostModal }) {
  const [loading, setLoading] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);

    const myPosts = async () => {
      setLoading(true);
      await Axios.get(`/myposts?email=${email}`)
        .then((response) => {
          setMyPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    myPosts();
  }, []);

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
      <Modal show={viewMyPostModal} onHide={(e) => setViewMyPostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>My Posts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <div className="container-fluid">
              <div className="feed">
                {myPosts.map((post) => {
                  const ts = post.createdtime.split("T");
                  const date = ts[0].split("-");
                  const year = date[0];
                  const month = date[1];
                  const day = date[2];

                  return (
                    <Post
                      key={post.postID}
                      postId={post.postID}
                      userName={post.postedusername}
                      userEmail={email}
                      posterEmail={post.posteremail}
                      profilePic={post.posteduserpic}
                      image={post.postpic}
                      message={post.postcaption}
                      timeStamp={month + "/" + day + "/" + year}
                      reportCount={post.reportcount}
                      likeCount={post.likecount}
                      commentCount={post.commentcount}
                      userLikeStatus={post.userlikestatus}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default ViewMyPostModal;
