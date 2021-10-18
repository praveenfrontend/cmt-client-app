/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Link } from "react-router-dom";
import Axios from "axios";

import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormDropDown from "../../../FormFields/FormDropDown";
import { CSSTransition } from "react-transition-group";
import swal from "sweetalert";
import Container from "../../../common/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditGoalDetails({ value, values, inputChange, inputChangeDate, loadingHandler, responseHandler }) {

    const [submitCount, setSubmitCount] = useState(0);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
  
    const initialState = {
      location: {
        value: "aaa",
        hasErrors: false,
        message: ""
      },
      instructor: {
        value: values.Instructor,
        hasErrors: false,
        message: ""
      },
      startDate: {
        value: values.StartDate,
        hasErrors: false,
        message: ""
      },
      endDate: {
        value: values.EndDate,
        hasErrors: false,
        message: ""
      },
      status: {
        value: values.Status,
        hasErrors: false,
        message: ""
      },
      ratingBefore: {
        value: values.RatingBefore,
        hasErrors: false,
        message: ""
      }
    };
  
    function ourReducer(draft, action) {
      switch (action.type) {
        case "locationImmediately":
          draft.location.hasErrors = false;
          draft.location.value = action.value;
          if (draft.location.value === "") {
            draft.location.hasErrors = true;
            draft.location.message = "Location cannot be empty.";
            return;
          }
          return;
        case "instructorImmediately":
          draft.instructor.hasErrors = false;
          draft.instructor.value = action.value;
          if (/\d/.test(draft.instructor.value)) {
            draft.instructor.hasErrors = true;
            draft.instructor.message = "Instructor cannot contain number.";
            return;
          }
          if (draft.instructor.value === "") {
            draft.instructor.hasErrors = true;
            draft.instructor.message = "Instructor cannot be empty.";
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
          inputChangeDate("StartDate", draft.startDate.value)
          return;
        case "endDateImmediately":
          draft.endDate.hasErrors = false;
          draft.endDate.value = action.value;
          if (draft.endDate.value.length === 0) {
            draft.endDate.hasErrors = true;
            draft.endDate.message = "End Date cannot be empty.";
            return;
          }
          inputChangeDate("EndDate", draft.endDate.value);
          return;

        case "statusImmediately":
          draft.status.hasErrors = false;
          draft.status.value = action.value;
          if (draft.status.value === "") {
            draft.status.hasErrors = true;
            draft.status.message = "Select Status.";
          }
          return;

        case "ratingBeforeImmediately":
          draft.ratingBefore.hasErrors = false;
          draft.ratingBefore.value = action.value;
          if (draft.ratingBefore.value === "") {
            draft.ratingBefore.hasErrors = true;
            draft.ratingBefore.message = "Select Rating Before.";
          }
          return;

        case "submitForm":
          if (!draft.location.hasErrors && !draft.instructor.hasErrors && !draft.startDate.hasErrors && !draft.endDate.hasErrors && !draft.status.hasErrors && !draft.ratingBefore.hasErrors ) {
            setSubmitCount(1);
          }
          return;
      }
    }
  
    const [state, dispatch] = useImmerReducer(ourReducer, initialState);

    useEffect(()=> {
        dispatch({ type: "locationImmediately", value: values.Location });
        dispatch({ type: "instructorImmediately", value: values.Instructor });
        dispatch({ type: "startDateImmediately", value: values.StartDate });
        dispatch({ type: "endDateImmediately", value: values.EndDate });
        dispatch({ type: "statusImmediately", value: values.Status });
        dispatch({ type: "ratingBeforeImmediately", value: values.RatingBefore });

    }, [dispatch, values.EndDate, values.Instructor, values.Location, values.RatingBefore, values.StartDate, values.Status])

    useEffect(() => {
      if (submitCount) {
        async function fetchResults() {
          // setLoading(true);
          loadingHandler(true)
          try {
            const response = await Axios.post(
              "/irf_updateGoal",
              {
                tb_user_details_goals_update_id: values.tb_user_details_goals_update_id,
                userId: values.userId,
                CategoryName: values.CategoryName,
                ProgramName: values.ProgramName,
                Location: values.Location,
                Instructor: values.Instructor,
                StartDate: values.StartDate,
                EndDate: values.EndDate,
                Status: values.Status,
                ParticipantComments: values.ParticipantComments,
                AdditionalComments: values.AdditionalComments,
                RatingBefore: values.RatingBefore,
                RatingAfter: values.RatingAfter
              }
            );

            if (response.data.success === true) {
              loadingHandler(false)
              responseHandler(true)
            }
          } catch (e) {
            swal("Please update all fields.", e.response.data, "error");
            loadingHandler(false)
          }
        }
        fetchResults();
        setSubmitCount(0);
      }
    }, [dispatch, loadingHandler, responseHandler, submitCount, values.tb_user_details_goals_update_id, values.AdditionalComments, values.CategoryName, values.EndDate, values.Instructor, values.Location, values.ParticipantComments, values.ProgramName, values.RatingAfter, values.RatingBefore, values.StartDate, values.Status, values.password, values.userId]);

    async function handleSubmit(e) {
      e.preventDefault();
  
      dispatch({ type: "locationImmediately", value: state.location.value });
      dispatch({ type: "instructorImmediately", value: state.instructor.value });
      dispatch({ type: "startDateImmediately", value: state.startDate.value });
      dispatch({ type: "endDateImmediately", value: state.endDate.value });
      dispatch({ type: "statusImmediately", value: state.status.value });
      dispatch({ type: "ratingBeforeImmediately", value: state.ratingBefore.value });
      dispatch({ type: "submitForm" });
    }
  
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
      

    return (
      <>
        <Container title="Goal Details">
        <div className="row">
          <div className="col-md-4">
            <div className={`form-group row`}>
              <label class="col-sm-4 form-control-label">Category Name</label>
              <div className="col-sm-8 mb-3">
                <FormInput icon="fa fa-id-card-o" type="text" value={values.CategoryName} disabled />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`form-group row`}>
              <label class="col-sm-4 form-control-label">Programs List</label>
              <div className="col-sm-8 mb-3">
                <FormInput icon="fa fa-id-card-o" type="text" value={values.ProgramName} disabled />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {/* <FormInput icon="fa fa-id-card-o" type="text" placeholder="Location" changeHandler={inputChange("Location")} value={values.Location} /> */}
            <FormInput icon="fa fa-id-card-o" type="text" placeholder="Location" changeHandler={inputChange("Location")} inputHandler={e => dispatch({ type: "locationImmediately", value: e.target.value })} message={state.location.message} inputField={state.location.hasErrors} value={values.Location}/>
          </div>
          <div className="col-md-4">
            {/* <FormInput icon="fas fa-user" type="text" placeholder="Instructor" changeHandler={inputChange("Instructor")} value={values.Instructor} /> */}
            <FormInput icon="fas fa-user" type="text" placeholder="Instructor" changeHandler={inputChange("Instructor")} inputHandler={e => dispatch({ type: "instructorImmediately", value: e.target.value })} message={state.instructor.message} inputField={state.instructor.hasErrors} value={values.Instructor} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {/* <FormInput icon="fas fa-calendar" type="text" placeholder="Start Date MM/DD/YYYY" changeHandler={inputChange("StartDate")} value={values.StartDate} /> */}
            {
                <div className="form-group">
                    <div className="input-group input-group-mb">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                            <i className="fas fa-calendar"></i>
                            </span>
                        </div>
                        <DatePicker className="form-control" selected={selectedStartDate} onChange={date => onChangeStartDateHandler(date)} placeholderText="Start Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" value={values.StartDate} />
                    </div>
                    <CSSTransition in={state.startDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                        <div className="alert alert-danger small liveValidateMessage">{state.startDate.message}</div>
                    </CSSTransition>
                    
                </div>
            }

          </div>
          <div className="col-md-4">
            {/* <FormInput icon="fas fa-calendar" type="text" placeholder="End Date MM/DD/YYYY" changeHandler={inputChange("EndDate")} value={values.EndDate} /> */}
            {
                <div className="form-group">
                    <div className="input-group input-group-mb">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon2">
                            <i className="fas fa-calendar"></i>
                            </span>
                        </div>
                        <DatePicker className="form-control" selected={selectedEndDate} onChange={date => onChangeEndDateHandler(date)}  placeholderText="End Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" value={values.EndDate} />
                    </div>
                    <CSSTransition in={state.endDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                        <div className="alert alert-danger small liveValidateMessage">{state.endDate.message}</div>
                    </CSSTransition>                    
                </div>
            }
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="agent_notes" className="text-muted">
                Participant Comments
              </label>
              <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("ParticipantComments")} value={values.ParticipantComments}></textarea>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="form-group">
              <label htmlFor="agent_notes" className="text-muted">
                Additional Comments
              </label>
              <textarea className="form-control col col-md-10" id="" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("AdditionalComments")} value={values.AdditionalComments}></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <div className="col">
              <label className="text-muted mr-2">Status:</label>
            </div>
            <div className="col">
              <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={inputChange("Status")} inputHandler={e => dispatch({ type: "statusImmediately", value: e.target.id })}  inputId="status_yetToBegin" inputName="Status" inputValue="Yet To Begin" inputLabel="Yet To Begin" checkedValue={values.Status} />
              <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={inputChange("Status")} inputHandler={e => dispatch({ type: "statusImmediately", value: e.target.id })} inputId="status_inProgress" inputName="Status" inputValue="In Progress" inputLabel="In Progress" checkedValue={values.Status} />
              <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={inputChange("Status")} inputHandler={e => dispatch({ type: "statusImmediately", value: e.target.id })} inputId="status_complete" inputName="Status" inputValue="Complete" inputLabel="Complete" checkedValue={values.Status} />
              <FormRadio classNameValue="col-md-3 col-lg-3 col-xl-3" changeHandler={inputChange("Status")} inputHandler={e => dispatch({ type: "statusImmediately", value: e.target.id })} inputId="status_inComplete" inputName="Status" inputValue="In Complete" inputLabel="In Complete" checkedValue={values.Status} />
            </div>
          </div>
        </div>
        <CSSTransition in={state.status.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.status.message}</div>
        </CSSTransition>

        <div className="form-group">
          <div className="row">
            <div className="col">
              <label className="text-muted mr-2">Rating Score: "Before" :</label>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col">
              <span className="col-md-1 col-lg-1 col-xl-1 mr-2">
                <label className="text-muted mr-2">Poor</label>
              </span>
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_1" inputName="RatingBefore" inputValue="1" inputLabel="1" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_2" inputName="RatingBefore" inputValue="2" inputLabel="2" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_3" inputName="RatingBefore" inputValue="3" inputLabel="3" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_4" inputName="RatingBefore" inputValue="4" inputLabel="4" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_5" inputName="RatingBefore" inputValue="5" inputLabel="5" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_6" inputName="RatingBefore" inputValue="6" inputLabel="6" checkedValue={values.RatingBefore} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingBefore")} inputHandler={e => dispatch({ type: "ratingBeforeImmediately", value: e.target.id })} inputId="before_7" inputName="RatingBefore" inputValue="7" inputLabel="7" checkedValue={values.RatingBefore} />
              <span className="col-md-1 col-lg-1 col-xl-1 text-muted">
                <label className="text-muted mr-2">Excellent</label>
              </span>
            </div>
          </div>
        </div>
        <CSSTransition in={state.ratingBefore.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.ratingBefore.message}</div>
        </CSSTransition>

        <div className="form-group">
          <div className="row">
            <div className="col">
              <label className="text-muted mr-2">Rating Score: "After" :</label>
            </div>
          </div>
          <div className="row d-flex">
            <div className="col">
              <span className="col-md-1 col-lg-1 col-xl-1 mr-2">
                <label className="text-muted mr-2">Poor</label>
              </span>
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_1" inputName="RatingAfter" inputValue="1" inputLabel="1" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_2" inputName="RatingAfter" inputValue="2" inputLabel="2" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_3" inputName="RatingAfter" inputValue="3" inputLabel="3" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_4" inputName="RatingAfter" inputValue="4" inputLabel="4" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_5" inputName="RatingAfter" inputValue="5" inputLabel="5" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_6" inputName="RatingAfter" inputValue="6" inputLabel="6" checkedValue={values.RatingAfter} />
              <FormRadio classNameValue="col-md-1 col-lg-1 col-xl-1" changeHandler={inputChange("RatingAfter")} inputId="after_7" inputName="RatingAfter" inputValue="7" inputLabel="7" checkedValue={values.RatingAfter} />
              <span className="col-md-1 col-lg-1 col-xl-1 text-muted">
                <label className="text-muted mr-2">Excellent</label>
              </span>
            </div>
          </div>
        </div>
      </Container>

      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <Link to="/" onClick={handleSubmit}>
            <button className="btn btn-block btn-success">Submit</button>
          </Link>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <Link to="/search">
            <button className="btn btn-block btn-danger">Back</button>
          </Link>
        </div>
      </div>

      </>
    );
  }
  
  export default EditGoalDetails;
  