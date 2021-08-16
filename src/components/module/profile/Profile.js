import React, { useState, useEffect } from "react";
import Axios from "axios";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import UploadPhotoModal from "./UploadPhotoModal";
import "./profile.scss";

function Profile() {
  const userObj = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    roleType: "",
    country: "",
    province: "",
    city: "",
    postal: ""
  };
  const [user, setUser] = useState(userObj);
  const [loading, setLoading] = useState(false);
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const token = localStorage.getItem("communityMattersToken");
      try {
        const response = await Axios.post("/profile", { token: token });
        setLoading(false);
        if (response.data.user !== null) {
          setUser(response.data.user);
        }
      } catch (e) {
        swal("Something went wrong!", e.response, "error");
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      {/* <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true}> */}
      <div className="mt-5">
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img src={user.profilepic} alt="Admin" class="rounded-circle" width="150" />
                      <div class="mt-3">
                        <h4>{user.firstName + " " + user.lastName}</h4>
                        <p class="text-secondary mb-1">{user.roleType}</p>
                        <p class="text-muted font-size-sm">{user.gender}</p>
                        <button class="btn btn-primary" onClick={e => setUploadPhotoModal(true)}>Upload photo</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.firstName + " " + user.middleName + " " + user.lastName}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.email}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Phone</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.phone}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Birth Date</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.birthDate}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Role</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.roleType}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Address</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{user.city + ", " + user.province + ", " + user.postal + ", " + user.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UploadPhotoModal uploadModal={uploadPhotoModal} setUploadModal={setUploadPhotoModal}/>
      </div>
      {/* </Loader> */}
    </LoadingOverlay>
  );
}

export default Profile;
