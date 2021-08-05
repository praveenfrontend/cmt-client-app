/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import { CSSTransition } from "react-transition-group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const [submitCount, setSubmitCount] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");

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

  const initialState = {
    title: {
      value: "",
      hasErrors: false,
      message: "",
    },
    programName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    startDate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    endDate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    startTime: {
      value: "",
      hasErrors: false,
      message: ""
    },
    endTime: {
      value: "",
      hasErrors: false,
      message: ""
    },
    instructorName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    location: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "titleImmediately":
        draft.title.hasErrors = false;
        draft.title.value = action.value;
        if (/\d/.test(draft.title.value)) {
          draft.title.hasErrors = true;
          draft.title.message = "Title cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.title.value)) {
          draft.title.hasErrors = true;
          draft.title.message = "Title cannot be empty.";
          return;
        }
        return;
      case "programNameImmediately":
        draft.programName.hasErrors = false;
        draft.programName.value = action.value;
        if (/\d/.test(draft.programName.value)) {
          draft.programName.hasErrors = true;
          draft.programName.message = "Program Name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.programName.value)) {
          draft.programName.hasErrors = true;
          draft.programName.message = "Program Name cannot be empty.";
          return;
        }
        return;
      case "startDateImmediately":
        draft.startDate.hasErrors = false;
        draft.startDate.value = action.value;
        if (draft.startDate.value.length === 0) {
          draft.startDate.hasErrors = true;
          draft.startDate.message = "Start Date cannot be empty.";
          return;
        }
        setStartDate( draft.startDate.value)
        return;
      case "endDateImmediately":
        draft.endDate.hasErrors = false;
        draft.endDate.value = action.value;
        if (draft.endDate.value.length === 0) {
          draft.endDate.hasErrors = true;
          draft.endDate.message = "End Date cannot be empty.";
          return;
        }
        setEndDate( draft.endDate.value);
        return;

      case "startTimeImmediately":
        draft.startTime.hasErrors = false;
        draft.startTime.value = action.value;
        if (draft.startTime.value === "") {
          draft.startTime.hasErrors = true;
          draft.startTime.message = "Start time cannot be empty.";
        }
        return;
      case "endTimeImmediately":
          draft.endTime.hasErrors = false;
          draft.endTime.value = action.value;
          if (draft.endTime.value === "") {
            draft.endTime.hasErrors = true;
            draft.endTime.message = "End time cannot be empty.";
          }
          return;

      
      case "instructorImmediately":
        draft.instructorName.hasErrors = false;
        draft.instructorName.value = action.value;
        if (/\d/.test(draft.instructorName.value)) {
          draft.instructorName.hasErrors = true;
          draft.instructorName.message = "Instructor cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.instructorName.value)) {
          draft.instructorName.hasErrors = true;
          draft.instructorName.message = "Instructor cannot be empty.";
          return;
        }
        return;
      case "locationImmediately":
          draft.location.hasErrors = false;
          draft.location.value = action.value;
          if (/\d/.test(draft.location.value)) {
            draft.location.hasErrors = true;
            draft.location.message = "Location cannot contain number.";
            return;
          }
          if (!/^[a-zA-Z]+$/.test(draft.location.value)) {
            draft.location.hasErrors = true;
            draft.location.message = "Location cannot be empty.";
            return;
          }
          return;

      case "submitForm":
        if (!draft.title.hasErrors && !draft.programName.hasErrors && !draft.startDate.hasErrors && !draft.endDate.hasErrors && !draft.startTime.hasErrors && !draft.endTime.hasErrors && !draft.instructorName.hasErrors && !draft.location.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const closeModalForm = () => {
    setEditModal(false);
    setEventObj();
  };

  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);
        try {
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

      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [EndDate, EndTime, Instructor, Location, ProgramName, StartDate, StartTime, Title, UserID, closeModalForm, dispatch, id, submitCount]);



  useEffect(() => {
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
  }, [eventObj]);

  const onChangeStartDateHandler = input => {
    const year = new Date(input).getFullYear();
    let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
    let day = new Date(input).getDate().toString().padStart(2, "0");
    let date = month + "/" + day + "/" + year;

    setSelectedStartDate(input);
    dispatch({ type: "startDateImmediately", value: date });
  };

  const onChangeEndDateHandler = input => {
      const year = new Date(input).getFullYear();
      let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
      let day = new Date(input).getDate().toString().padStart(2, "0");
      let date = month + "/" + day + "/" + year;

      setSelectedEndDate(input);
      dispatch({ type: "endDateImmediately", value: date });
    };
  

  const updateSchedule = async e => {
    e.preventDefault();

    dispatch({ type: "titleImmediately", value: state.title.value });
      dispatch({ type: "programNameImmediately", value: state.programName.value });
      dispatch({ type: "startDateImmediately", value: state.startDate.value });
      dispatch({ type: "endDateImmediately", value: state.endDate.value });
      dispatch({ type: "startTimeImmediately", value: state.startTime.value });
      dispatch({ type: "endTimeImmediately", value: state.endTime.value });
      dispatch({ type: "instructorImmediately", value: state.instructorName.value });
      dispatch({ type: "locationImmediately", value: state.location.value });
      dispatch({ type: "submitForm" });
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
                <input type="text" class="form-control" id="inputTitle" name="Title" onChange={e => setTitle(e.target.value)} onInput={e => dispatch({ type: "titleImmediately", value: e.target.value })}  value={Title} />
              </div>
              <CSSTransition in={state.title.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.title.message}</div>
              </CSSTransition>

              <div class="form-group col-md-6">
                <label for="inputProgramName">Program Name</label>
                <input type="text" class="form-control" id="inputProgramName" name="ProgramName" onChange={e => setProgramName(e.target.value)} onInput={e => dispatch({ type: "programNameImmediately", value: e.target.value })} value={ProgramName} />
              </div>
              <CSSTransition in={state.programName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.programName.message}</div>
              </CSSTransition>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStartDate">Start Date</label>
                {/* <input type="text" class="form-control" id="inputStartDate" name="StartDate" placeholder="MM/DD/YYYY" onChange={e => setStartDate(e.target.value)} value={StartDate} /> */}
                <DatePicker value={StartDate} className="form-control" selected={selectedStartDate} onChange={date => onChangeStartDateHandler(date)} placeholderText="Start Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
              <CSSTransition in={state.startDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.startDate.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <label for="inputEndDate">End Date</label>
                {/* <input type="text" class="form-control" id="inputEndDate" name="EndDate" placeholder="MM/DD/YYYY" onChange={e => setEndDate(e.target.value)} value={EndDate} /> */}
                <DatePicker value={EndDate} className="form-control" selected={selectedEndDate} onChange={date => onChangeEndDateHandler(date)}  placeholderText="End Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
              <CSSTransition in={state.endDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.endDate.message}</div>
                </CSSTransition> 
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputStartTime">Start Time</label>
                <input type="text" class="form-control" id="inputStartTime" name="StartTime" placeholder="HH:MM" onChange={e => setStartTime(e.target.value)} onInput={e => dispatch({ type: "startTimeImmediately", value: e.target.value })} value={StartTime} />
              </div>
              <CSSTransition in={state.startTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.startTime.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <label for="inputEndTime">End Time</label>
                <input type="text" class="form-control" id="inputEndTime" name="EndTime" placeholder="HH:MM" onChange={e => setEndTime(e.target.value)} onInput={e => dispatch({ type: "endTimeImmediately", value: e.target.value })}  value={EndTime} />
              </div>
              <CSSTransition in={state.endTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.endTime.message}</div>
              </CSSTransition>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputInstructor">Instructor Name</label>
                <input type="text" class="form-control" id="inputInstructor" name="Instructor" onChange={e => setInstructor(e.target.value)} onInput={e => dispatch({ type: "instructorImmediately", value: e.target.value })} value={Instructor} />
              </div>
              <CSSTransition in={state.instructorName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.instructorName.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <label for="inputLocation">Location</label>
                <input type="text" class="form-control" id="inputLocation" name="Location" onChange={e => setLocation(e.target.value)} onInput={e => dispatch({ type: "locationImmediately", value: e.target.value })} value={Location} />
              </div>
              <CSSTransition in={state.location.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.location.message}</div>
            </CSSTransition>
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
