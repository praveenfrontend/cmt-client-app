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
import ParticipantsModal from "./ParticipantsModal";

function EditScheduleModal({ editModal, setEditModal, eventObj, setEventObj }) {

  const [participantModal, setParticipantModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [UserID, setUserId] = useState("");
  const [Description, setDescription] = useState("");
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");

  const [submitCount, setSubmitCount] = useState(0);
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");

  const [categoryAndProgramList, setCategoryAndProgramList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [Category, setCategory] = useState("");
  const [ProgramName, setProgramName] = useState("");

  const [id, setId] = useState("");

  const roleType = localStorage.getItem('roleType');

  const initialState = {
    description: {
      value: eventObj.title,
      hasErrors: false,
      message: "",
    },
    category: {
      value: eventObj.categoryName,
      // value: Category,
      hasErrors: false,
      message: ""
    },
    programName: {
      value: eventObj.programName,
      // value: ProgramName,
      hasErrors: false,
      message: ""
    },
    fromDate: {
      value: eventObj.start,
      hasErrors: false,
      message: ""
    },
    toDate: {
      value: eventObj.end,
      hasErrors: false,
      message: ""
    },
    startTime: {
      value: eventObj.startTime,
      hasErrors: false,
      message: ""
    },
    endTime: {
      value: eventObj.endTime,
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "descriptionImmediately":
        draft.description.hasErrors = false;
        draft.description.value = action.value;
        if (draft.description.value === "") {
          draft.description.hasErrors = true;
          draft.description.message = "Description cannot be empty.";
          return;
        }
        return;
      case "categoryImmediately":
        draft.category.hasErrors = false;
        draft.category.value = action.value;
        if (draft.category.value === "") {
          draft.category.hasErrors = true;
          draft.category.message = "Select Category.";
          return;
        }
        return;
      case "programNameImmediately":
        draft.programName.hasErrors = false;
        draft.programName.value = action.value;
        if (draft.programName.value === "") {
          draft.programName.hasErrors = true;
          draft.programName.message = "Select Program.";
          return;
        }
        return;
      case "fromDateImmediately":
        draft.fromDate.hasErrors = false;
        draft.fromDate.value = action.value;
        if (draft.fromDate.value === "") {
          draft.fromDate.hasErrors = true;
          draft.fromDate.message = "From Date Date cannot be empty.";
          return;
        }
        setFromDate( draft.fromDate.value)
        return;
      case "toDateImmediately":
        draft.toDate.hasErrors = false;
        draft.toDate.value = action.value;
        if (draft.toDate.value === "") {
          draft.toDate.hasErrors = true;
          draft.toDate.message = "To Date cannot be empty.";
          return;
        }
        setToDate( draft.toDate.value);
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

      case "submitForm":
        if (!draft.description.hasErrors && !draft.category.hasErrors && !draft.programName.hasErrors && !draft.fromDate.hasErrors && !draft.toDate.hasErrors && !draft.startTime.hasErrors && !draft.endTime.hasErrors ) {
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
          const response = await Axios.put(`/update_schedule/${id}`, { UserID, Description, Category, ProgramName, FromDate: FromDate + ' ' + selectedStartTime, ToDate: ToDate + ' ' + selectedEndTime });
    
          if (response.data.id !== "" || response.data.id !== null) {
            setLoading(false);
            closeModalForm();
            swal(`Schedule Updated.`, "Program will be updated to the calendar.", "success").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } else {
            swal("Something went wrong", "Make sure start time must be after 5 hours from now.", "error")/* .then(response => {
              setLoading(true);
              window.location.reload();
            }); */
          }
        } catch (e) {
          swal("Something went wrong", "Make sure start time must be after 5 hours from now.", "error");
          setLoading(false);
        }

      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [ToDate, ProgramName, FromDate, Description, UserID, closeModalForm, dispatch, id, submitCount, Category, selectedStartTime, selectedEndTime]);


  useEffect(() => {
    const categoryDropDown = async () => {
      setLoading(true);
      await Axios.get("/showprograms")
        .then(response => {
          setCategoryAndProgramList(response.data.data);
          const category = Object.keys(response.data.data);
          setCategoryList([...categoryList, ...category]);
          setLoading(false);
        })
        .catch(error => {
          console.log(error.response);
          setLoading(false);
        });
    };
    categoryDropDown();
  }, []);

  const categoryHandleChange = value => {
    setCategory(value);
    setProgramList(categoryAndProgramList[value]);
  };

  const programHandleChange = value => {
    setProgramName(value);
  };

  useEffect(() => {
    setId(eventObj.id);
    setUserId(eventObj.userId);

    setDescription(eventObj.title);
    setProgramName(eventObj.programName);
    setCategory(eventObj.categoryName);

    const fromDate = dateConvertor(eventObj.start);
    const toDate = dateConvertor(eventObj.end);

    setFromDate(fromDate);
    setToDate(toDate);

    setSelectedStartTime(eventObj.startTime);
    setSelectedEndTime(eventObj.endTime);

    // setProgramList(categoryAndProgramList[Category]);

  }, [/* categoryAndProgramList, */ eventObj]);

  useEffect(() => {
    const value = categoryAndProgramList[eventObj.categoryName];
    setProgramList(value); 
  }, [categoryAndProgramList, eventObj])

  // useEffect(() => {
  //   console.log('programList ', programList)
  // }, [programList])

  /* const onChangeStartDateHandler = input => {
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
    }; */

  const onChangeStartTimeHandler = input => {
    const hours = ( new Date(input).getHours() < 10 ? '0' : '' ) + new Date(input).getHours();
    const minutes = ( new Date(input).getMinutes() < 10 ? '0' : '' ) + new Date(input).getMinutes();
    const time = hours.toString() + ':' + minutes.toString() + ':00'

    setSelectedStartTime(time);
    dispatch({ type: "startTimeImmediately", value: time });
  };

  const onChangeEndTimeHandler = input => {
    const hours = ( new Date(input).getHours() < 10 ? '0' : '' ) + new Date(input).getHours();
    const minutes = ( new Date(input).getMinutes() < 10 ? '0' : '' ) + new Date(input).getMinutes();
    const time = hours.toString() + ':' + minutes.toString() + ':00'

    setSelectedEndTime(time);
    dispatch({ type: "endTimeImmediately", value: time });
  };

  const dateConvertor = input => {

    const year = new Date(input).getFullYear();
    let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
    let day = new Date(input).getDate().toString().padStart(2, "0");
    let date = month + "/" + day + "/" + year;
    return date;
  }

  const onChangeFromDateHandler = input => {
    
    const date = dateConvertor(input);
    setSelectedFromDate(input);
    dispatch({ type: "fromDateImmediately", value: date });
  };

  const onChangeToDateHandler = input => {

    const date = dateConvertor(input);
    setSelectedToDate(input);
    dispatch({ type: "toDateImmediately", value: date });
  };


  const updateSchedule = async e => {
    e.preventDefault();

    dispatch({ type: "descriptionImmediately", value: state.description.value });
    dispatch({ type: "categoryImmediately", value: state.category.value });
    dispatch({ type: "programNameImmediately", value: state.programName.value });
    // dispatch({ type: "fromDateImmediately", value: state.startDate.value });
    // dispatch({ type: "toDateImmediately", value: state.endDate.value });
    dispatch({ type: "startTimeImmediately", value: state.startTime.value });
    dispatch({ type: "endTimeImmediately", value: state.endTime.value });
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

  const participantModalForm = (val) => {
    setParticipantModal(val);
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={editModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div  class="form-row">
              <div class="form-group col-md-6">
                <select readOnly={ (roleType === 'Participant') ? true: false}  name="account" className="form-control" /* value={Category} */ onChange={e => categoryHandleChange(e.target.value)} onInput={e => dispatch({ type: "categoryImmediately", value: e.target.value })}>
                  <option>Select Category Name</option>;
                  {categoryList.map(category => {
                    return <option value={category} selected={Category === category ? true : false} >{category}</option>;
                  })}
                </select>
              </div>
              <CSSTransition in={state.category.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.category.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <select readOnly={ (roleType === 'Participant') ? true: false}  name="account" className="form-control" /* value={ProgramName} */ onChange={e => programHandleChange(e.target.value)} onInput={e => dispatch({ type: "programNameImmediately", value: e.target.value })}>
                  <option>Select Program Name</option>;
                  {programList && programList.map(program => {
                    return <option value={program} selected={ProgramName === program ? true : false}>{program}</option>;
                  })}
                </select>
              </div>
              <CSSTransition in={state.programName.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.programName.message}</div>
              </CSSTransition>
            </div>

            <div class="form-row">
            <div class="form-group col-md-6">
              {/* <input type="text" class="form-control" id="inputStartDate" name="StartDate" placeholder="MM/DD/YYYY" onChange={e => setStartDate(e.target.value)} value={StartDate} /> */}
              <DatePicker readOnly={ (roleType === 'Participant') ? true: false} className="form-control" selected={selectedFromDate} value={FromDate} onChange={date => onChangeFromDateHandler(date)} placeholderText="From Date" dateFormat="MM/dd/yyyy" minDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
            </div>
            <CSSTransition in={state.fromDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.fromDate.message}</div>
            </CSSTransition>
            <div class="form-group col-md-6">
              {/* <input type="text" class="form-control" id="inputEndDate" name="EndDate" placeholder="MM/DD/YYYY" onChange={e => setEndDate(e.target.value)} value={EndDate} /> */}
              <DatePicker readOnly={ (roleType === 'Participant') ? true: false} className="form-control" selected={selectedToDate} value={ToDate} onChange={date => onChangeToDateHandler(date)}  placeholderText="To Date" dateFormat="MM/dd/yyyy" minDate={selectedFromDate} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
              <CSSTransition in={state.toDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.toDate.message}</div>
              </CSSTransition> 
          </div>

          
          <div class="form-row">
            <div class="form-group col-md-6">
              <DatePicker readOnly={ (roleType === 'Participant') ? true: false}  className="form-control" showTimeSelect  showTimeSelectOnly value={selectedStartTime}  onChange={time => onChangeStartTimeHandler(time)} placeholderText="Start Time" timeFormat="HH:mm" timeIntervals={30} /* minTime={new Date() } */ />
            </div>
            <CSSTransition in={state.startTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.startTime.message}</div>
            </CSSTransition>
            <div class="form-group col-md-6">
              <DatePicker readOnly={ (roleType === 'Participant') ? true: false}  className="form-control" showTimeSelect  showTimeSelectOnly value={selectedEndTime}  onChange={time => onChangeEndTimeHandler(time)} placeholderText="End Time" timeFormat="HH:mm" timeIntervals={30}  /* minTime={new Date(selectedStartTime)} */  />
            </div>
            <CSSTransition in={state.endTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.endTime.message}</div>
            </CSSTransition>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12">
              <input readOnly={ (roleType === 'Participant') ? true: false}  type="text" class="form-control" id="inputDescription" name="Description" placeholder="Description" onChange={e => setDescription(e.target.value)} onInput={e => dispatch({ type: "descriptionImmediately", value: e.target.value })} value={Description} />
            </div>
            <CSSTransition in={state.description.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.description.message}</div>
            </CSSTransition>
          </div>

          <div class="form-row">
            <button type="button" class="btn btn-link" onClick={() => participantModalForm(true)}>Show Participants</button>
          </div>

          </form>
        </Modal.Body>
        { 
          ( roleType !== 'Participant' ) && 
            <Modal.Footer>
              <button className="btn btn-block btn-primary" onClick={e => updateSchedule(e)}>
                Update Schedule
              </button>
              <button className="btn btn-block btn-danger" onClick={e => deleteSchedule(e)}>
                Delete Schedule
              </button>
            </Modal.Footer>
        }
      </Modal>
      <ParticipantsModal participantModal={participantModal} setParticipantModal={participantModalForm} programName={ProgramName}/>
    </LoadingOverlay>
  );
}

export default EditScheduleModal;
