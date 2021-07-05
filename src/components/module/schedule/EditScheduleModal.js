import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

function EditScheduleModal({ editModal, setEditModal, eventObj, setEventObj }) {
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
  const [id, setId] = useState("");

  // useEffect(() => {
  //   if (editModal === true) {
  //     setUserId("");
  //     setTitle("");
  //     setProgramName("");
  //     setStartDate("");
  //     setEndDate("");
  //     setStartTime("");
  //     setEndTime("");
  //     setInstructor("");
  //     setLocation("");
  //   }
  // }, [editModal]);

  useEffect(() => {
    console.log("event obj ", eventObj);
    // if (eventObj !== "" && eventObj !== null) {
    setUserId(eventObj.userId);
    setTitle(eventObj.title);
    setProgramName(eventObj.programName);
    setStartDate(eventObj.start);
    setEndDate(eventObj.end);
    setStartTime(eventObj.startTime);
    setEndTime(eventObj.endTime);
    setInstructor(eventObj.instructor);
    setLocation(eventObj.location);
    setId(eventObj.id);
    // }
  }, [eventObj]);

  const closeModalForm = () => {
    setEditModal(false);
    setEventObj();
  };

  const updateSchedule = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios.put(`/update_schedule/${id}`, { UserID, Title, ProgramName, StartDate, EndDate, StartTime, EndTime, Instructor, Location });

      if (response.data.id !== "" || response.data.id !== null) {
        setLoading(false);
        closeModalForm();
        swal(`Schedule Updated.`, "Program will be updated to the calendar.", "success").then(res => {
          setLoading(true);
          window.location.reload();
        });
      }
    } catch (e) {
      swal("Something went wrong", e.response.error, "error");
      setLoading(false);
    }
  };

  const deleteSchedule = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios.delete(`/delete_schedule/${id}`);

      if (response.data.success === true || response.data.message === "Event Deleted") {
        setLoading(false);
        closeModalForm();
        swal(`Schedule Deleted.`, "Program will be removed from the calendar.", "success").then(res => {
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
      <Modal show={editModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
          <button className="btn btn-block btn-primary" onClick={e => updateSchedule(e)}>
            Update Schedule
          </button>
          <button className="btn btn-block btn-danger" onClick={e => deleteSchedule(e)}>
            Delete Schedule
          </button>
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default EditScheduleModal;
