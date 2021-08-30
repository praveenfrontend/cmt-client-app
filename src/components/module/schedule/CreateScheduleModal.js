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

function CreateScheduleModal({ scheduleModal, setScheduleModal }) {
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

  const initialState = {
    description: {
      value: "",
      hasErrors: false,
      message: "",
    },
    category: {
      value: "",
      hasErrors: false,
      message: ""
    },
    programName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    fromDate: {
      value: "",
      hasErrors: false,
      message: ""
    },
    toDate: {
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
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "descriptionImmediately":
        draft.description.hasErrors = false;
        draft.description.value = action.value;
        if (draft.description.length === 0) {
          draft.description.hasErrors = true;
          draft.description.message = "Description cannot be empty.";
          return;
        }
        return;
      case "categoryImmediately":
        draft.category.hasErrors = false;
        draft.category.value = action.value;
        if (/\d/.test(draft.category.value)) {
          draft.category.hasErrors = true;
          draft.category.message = "Category Name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(draft.category.value)) {
          draft.category.hasErrors = true;
          draft.category.message = "Category Name cannot be empty.";
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
      case "fromDateImmediately":
        draft.fromDate.hasErrors = false;
        draft.fromDate.value = action.value;
        if (draft.fromDate.value.length === 0) {
          draft.fromDate.hasErrors = true;
          draft.fromDate.message = "From Date Date cannot be empty.";
          return;
        }
        setFromDate( draft.fromDate.value)
        return;
      case "toDateImmediately":
        draft.toDate.hasErrors = false;
        draft.toDate.value = action.value;
        if (draft.toDate.value.length === 0) {
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
    setScheduleModal(false);
  };

  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        setLoading(true);
        try {
          const response = await Axios.post("/add_schedule", { UserID, Description, Category, ProgramName, FromDate: FromDate + ' ' + selectedStartTime, ToDate: ToDate + ' ' + selectedEndTime });
    
          if (response.data.id !== "" || response.data.id !== null) {
            setLoading(false);
            closeModalForm();
            swal(`Schedule Created.`, "Program will be added to the calendar.", "success").then(res => {
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
  }, [ToDate, ProgramName, FromDate, Description, UserID, closeModalForm, dispatch, submitCount, Category, selectedStartTime, selectedEndTime]);


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
    if (scheduleModal === true) {
      const id = localStorage.getItem("id");
      setUserId(id);
      setDescription("");
      setCategory("");
      setProgramName("");
      setFromDate("");
      setToDate("");
    }
  }, [scheduleModal]);

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

  const onChangeFromDateHandler = input => {
    const year = new Date(input).getFullYear();
    let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
    let day = new Date(input).getDate().toString().padStart(2, "0");
    let date = month + "/" + day + "/" + year;

    setSelectedFromDate(input);
    dispatch({ type: "fromDateImmediately", value: date });
  };

  const onChangeToDateHandler = input => {
      const year = new Date(input).getFullYear();
      let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
      let day = new Date(input).getDate().toString().padStart(2, "0");
      let date = month + "/" + day + "/" + year;

      setSelectedToDate(input);
      dispatch({ type: "toDateImmediately", value: date });
    };
  

  const createSchedule = async e => {
    e.preventDefault();

    dispatch({ type: "categoryImmediately", value: state.category.value });
    dispatch({ type: "programNameImmediately", value: state.programName.value });
    dispatch({ type: "fromDateImmediately", value: state.fromDate.value });
    dispatch({ type: "toDateImmediately", value: state.toDate.value });
    dispatch({ type: "startTimeImmediately", value: state.startTime.value });
    dispatch({ type: "endTimeImmediately", value: state.endTime.value });
    dispatch({ type: "descriptionImmediately", value: state.description.value });
    dispatch({ type: "submitForm" });
   
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={scheduleModal} onHide={closeModalForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create a schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>

            <div  class="form-row">
              <div class="form-group col-md-6">
                <select name="account" className="form-control" onChange={e => categoryHandleChange(e.target.value)} onInput={e => dispatch({ type: "categoryImmediately", value: e.target.value })}>
                  <option>Select Category Name</option>;
                  {categoryList.map(category => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </div>
              <CSSTransition in={state.category.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.category.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <select name="account" className="form-control" onChange={e => programHandleChange(e.target.value)} onInput={e => dispatch({ type: "programNameImmediately", value: e.target.value })}>
                  <option>Select Program Name</option>;
                  {programList.map(program => {
                    return <option value={program}>{program}</option>;
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
                <DatePicker className="form-control" selected={selectedFromDate} onChange={date => onChangeFromDateHandler(date)} placeholderText="From Date" dateFormat="MM/dd/yyyy" minDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
              </div>
              <CSSTransition in={state.fromDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                  <div className="alert alert-danger small liveValidateMessage">{state.fromDate.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                {/* <input type="text" class="form-control" id="inputEndDate" name="EndDate" placeholder="MM/DD/YYYY" onChange={e => setEndDate(e.target.value)} value={EndDate} /> */}
                <DatePicker className="form-control" selected={selectedToDate} onChange={date => onChangeToDateHandler(date)}  placeholderText="To Date" dateFormat="MM/dd/yyyy" minDate={selectedFromDate} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                </div>
                <CSSTransition in={state.toDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.toDate.message}</div>
                </CSSTransition> 
            </div>

            
            <div class="form-row">
              <div class="form-group col-md-6">
                <DatePicker className="form-control" showTimeSelect  showTimeSelectOnly value={selectedStartTime}  onChange={time => onChangeStartTimeHandler(time)} placeholderText="Start Time" timeFormat="HH:mm" timeIntervals={30} /* minTime={new Date() } */ />
              </div>
              <CSSTransition in={state.startTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.startTime.message}</div>
              </CSSTransition>
              <div class="form-group col-md-6">
                <DatePicker className="form-control" showTimeSelect  showTimeSelectOnly value={selectedEndTime}  onChange={time => onChangeEndTimeHandler(time)} placeholderText="End Time" timeFormat="HH:mm" timeIntervals={30}  /* minTime={new Date(selectedStartTime)} */ />
              </div>
              <CSSTransition in={state.endTime.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.endTime.message}</div>
              </CSSTransition>
            </div>

            <div class="form-row">
              <div class="form-group col-md-12">
                <input type="text" class="form-control" id="inputDescription" name="Description" placeholder="Description" onChange={e => setDescription(e.target.value)} onInput={e => dispatch({ type: "descriptionImmediately", value: e.target.value })} value={Description} />
              </div>
              <CSSTransition in={state.description.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.description.message}</div>
              </CSSTransition>

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
