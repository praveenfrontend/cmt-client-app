/* eslint-disable default-case */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

function UploadPhotoModal({ uploadModal, setUploadModal }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");

  const fileHandler = e => {
    setSelectedFile(e.target.files[0]);
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
    document.getElementsByClassName("custom-file-label").innerHTML = fileName;
  };

  const closeModalForm = () => {
    setUploadModal(false);
  };

  const uploadFile = async e => {
    e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem("email");

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("email", email);

    try {
      const response = await Axios.post("/UpdateProfilePic", formData);

      if (response.data.success === true) {
        setLoading(false);
        closeModalForm();
        swal(response.data.message, "", "success").then(res => {
          setLoading(true);
          window.location.reload();
        });
      } else {
        setLoading(false);
        closeModalForm();
        swal("Something went wrong", response.data.message, "warning").then(res => {
          setLoading(true);
          window.location.reload();
        });
      } 
    } catch (e) {
      setLoading(false);
      closeModalForm();
      swal("Something went wrong", e.response, "error").then(res => {
        setLoading(true);
        window.location.reload();
      });
    }
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={uploadModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-row">

              <div class="form-group col-md-12">
                <div className="custom-file">
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={e => fileHandler(e)} />
                  <label className="custom-file-label" for="inputGroupFile01">
                    {selectedFileName ? selectedFileName : "Choose file"}
                  </label>
                </div>
              </div>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-block btn-primary" onClick={e => uploadFile(e)}>
            Upload Photo
          </button>   
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default UploadPhotoModal;
