import React, { useState, useEffect } from "react";
import "./MessageSender.css";
import { Avatar } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Axios from "axios";
import UploadFeedPhoto from "./UploadFeedPhoto";

function MessageSender({ handleMessages }) {
  const [input, setInput] = useState("");
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("postcaption", input);
    selectedFileName && formData.append("file", selectedFile);

    if (input !== "") {
      try {
        await Axios.post("/addpost", formData).then((response) => {
          handleMessages(true);
        });
      } catch (e) {}
    }
    setInput("");
    setSelectedFileName("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender_top">
        <Avatar />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender_input"
            type="text"
            placeholder={`What's on your mind?`}
            maxLength="1000"
          />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Post
          </button>
        </form>
      </div>
      <div className="messageSender_bottom">
        <div
          className="messageSender_option"
          onClick={(e) => setUploadPhotoModal(true)}
        >
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo</h3>
          <p className="messageSender_fileName">{selectedFileName}</p>
        </div>
      </div>
      <UploadFeedPhoto
        uploadModal={uploadPhotoModal}
        setUploadModal={setUploadPhotoModal}
        setSelectedFile={setSelectedFile}
        setSelectedFileName={setSelectedFileName}
      />
    </div>
  );
}

export default MessageSender;
