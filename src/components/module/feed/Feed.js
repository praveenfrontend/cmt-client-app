import React,  {useEffect, useState} from "react";
import Axios from "axios";
import Page from "../../common/Page";
import MessageSender from "./MessageSender";
import Post from "./Post";

function Feed() {

  const [allPosts, setAllPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [role, SetRole] = useState("");
  const [handleLike, setHandleLike] = useState(false);
  const [handleDelete, setHandleDelete] = useState(false);
  const [handleMessages, setHandleMessages] = useState(false);


  useEffect(() => {
    const roleType = localStorage.getItem("roleType");
    SetRole(roleType);
    
    const email = localStorage.getItem("email");
    setEmail(email);

    const allPosts = async () => {
      // setLoading(true);
      await Axios.get(`/allPosts?email=${email}`)
        .then(response => {
          setAllPosts(response.data)
          // setLoading(false);
        })
        .catch(error => {
          // setLoading(false);
        });
        setHandleLike(false);
        setHandleDelete(false);
        setHandleMessages(false);
    };
    allPosts();
    
  }, [handleLike, handleDelete, handleMessages])

  return (
    <section>
      <div className="container-fluid">
        <div className="feed">
          <MessageSender handleMessages={setHandleMessages}/>
          {
            allPosts.map(post => {

              const ts = post.createdtime.split('T');
              const date = ts[0].split('-');
              const year = date[0]
              const month = date[1]; 
              const day = date[2];

              return <Post
                key={post.postID}
                postId={post.postID}
                role={role}
                userName={post.postedusername}
                userEmail={email}
                posterEmail={post.posteremail}
                profilePic={post.posteduserpic}
                image={post.postpic}
                message={post.postcaption}
                timeStamp={month + '/' + day + '/' + year}
                reportCount={post.reportcount}
                likeCount={post.likecount}
                commentCount={post.commentcount}
                userLikeStatus={post.userlikestatus}
                handleLike={setHandleLike}
                handleDelete={setHandleDelete}
              />
            })
          }
        </div>
      </div>
    </section>
  );
}

export default Feed;
