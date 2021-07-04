import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

function CreateScheduleModal({ scheduleModal, setScheduleModal }) {
  const [loading, setLoading] = useState(false);
  const [UserID, setUserId] = useState("");
  const [Title, setTitle] = useState("");
  const [ProgramName, setProgramName] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [Instructor, setInstructor] = useState("");
  const [Location, setLocation] = useState("");

  useEffect(() => {
    if (scheduleModal === true) {
      const irfUserID = localStorage.getItem("irfUserID");
      setUserId(irfUserID);
      setTitle("");
      setProgramName("");
      setStartDate("");
      setEndDate("");
      setStartTime("");
      setEndTime("");
      setInstructor("");
      setLocation("");
    }
  }, [scheduleModal]);

  const closeModalForm = () => {
    setScheduleModal(false);
  };

  const createSchedule = async e => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const response = await Axios.post("/add_schedule", { UserID, Title, ProgramName, StartDate, EndDate, StartTime, EndTime, Instructor, Location });

      if (response.data.id !== "" || response.data.id !== null) {
        setLoading(false);
        closeModalForm();
        swal(`Schedule Created.`, "Program will be added to the calendar.", "success").then(res => {
          setLoading(true);
          window.location.reload();
        });
      }
    } catch (e) {
      swal("Something went wrong", e.response.error, "error");
      setLoading(false);
    }
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={scheduleModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create a schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <div class="form-group">
              <label for="inputUserID">User ID</label>
              <input type="text" class="form-control" id="inputUserID" name="UserID" onChange={e => setUserId(e.target.value)} value={UserID} />
            </div> */}
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" id="inputTitle" name="Title" onChange={e => setTitle(e.target.value)} value={Title} />
              </div>
              <div class="form-group col-md-6">
                <label for="inputProgramName">Program Name</label>
                <input type="text" class="form-control" id="inputProgramName" name="ProgramName" onChange={e => setProgramName(e.target.value)} value={ProgramName} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStartDate">Start Date</label>
                <input type="text" class="form-control" id="inputStartDate" name="StartDate" placeholder="MM/DD/YYYY" onChange={e => setStartDate(e.target.value)} value={StartDate} />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEndDate">End Date</label>
                <input type="text" class="form-control" id="inputEndDate" name="EndDate" placeholder="MM/DD/YYYY" onChange={e => setEndDate(e.target.value)} value={EndDate} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStartTime">Start Time</label>
                <input type="text" class="form-control" id="inputStartTime" name="StartTime" placeholder="HH:MM" onChange={e => setStartTime(e.target.value)} value={StartTime} />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEndTime">End Time</label>
                <input type="text" class="form-control" id="inputEndTime" name="EndTime" placeholder="HH:MM" onChange={e => setEndTime(e.target.value)} value={EndTime} />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputInstructor">Instructor Name</label>
                <input type="text" class="form-control" id="inputInstructor" name="Instructor" onChange={e => setInstructor(e.target.value)} value={Instructor} />
              </div>
              <div class="form-group col-md-6">
                <label for="inputLocation">Location</label>
                <input type="text" class="form-control" id="inputLocation" name="Location" onChange={e => setLocation(e.target.value)} value={Location} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-block btn-primary" onClick={e => createSchedule(e)}>
            Create Schedule
          </button>
          {/* <button className="btn btn-block btn-secondary" onClick={() => closeModalForm()}>
          Close
        </button> */}
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default CreateScheduleModal;
