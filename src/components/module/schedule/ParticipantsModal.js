/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

function EditScheduleModal({ participantModal, setParticipantModal, programName }) {

  const [loading, setLoading] = useState(false);
  const [participantList, setParticipantList] = useState([]);

  const closeModalForm = () => {
    setParticipantModal(false);
  };

  useEffect(() => {
    const participantsList = async () => {
      setLoading(true);
      await Axios.get(`/ProgramUsers?ProgramName=${programName}`)
        .then(response => {
          setParticipantList(response.data.data.programUsers);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    participantsList();
  }, [programName, participantModal]);

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={participantModal} onHide={closeModalForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Participants List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div  class="form-row">
              <div class="form-group" style={{height: "450px", overflow: "scroll"}}>
                <table class="table" >
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">User Id</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      participantList && participantList.map((obj, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{obj.userId}</td>
                            <td>{obj.firstName}</td>
                            <td>{obj.lastName}</td>
                            <td>{obj.email}</td>
                            <td>{obj.phoneCell}</td>
                          </tr>
                        )})
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </LoadingOverlay>
  );
}

export default EditScheduleModal;
