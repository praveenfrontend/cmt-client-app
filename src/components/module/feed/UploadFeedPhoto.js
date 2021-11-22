/* eslint-disable default-case */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

function UploadFeedPhoto({ uploadModal, setUploadModal, setSelectedFile, setSelectedFileName }) {
  const [loading, setLoading] = useState(false);

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
    setUploadModal(false);
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
      <Modal show={uploadModal} onHide={e => setUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <div className="custom-file">
                  <input
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e) => fileHandler(e)}
                  />
                  <label className="custom-file-label" for="inputGroupFile01">
                    Choose Photo
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default UploadFeedPhoto;
