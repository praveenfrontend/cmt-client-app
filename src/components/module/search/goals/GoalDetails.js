/* eslint-disable default-case */
import React, { useState } from "react";
import { useImmerReducer } from "use-immer";

import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormDropDown from "../../../FormFields/FormDropDown";
import { CSSTransition } from "react-transition-group";
import Container from "../../../common/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function GoalDetails({ values, inputChange, inputChangeProgramDefault, inputChangeDate }) {

    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    // const [inputStartDate, setInputStartDate] = useState("");
    // const [inputEndDate, setInputEndDate] = useState("");
  
    const initialState = {
      location: {
        value: "",
        hasErrors: false,
        message: ""
      },
      instructor: {
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
      status: {
        value: "",
        hasErrors: false,
        message: ""
      },
      ratingBefore: {
        value: "",
        hasErrors: false,
        message: ""
      }
    };
  
    function ourReducer(draft, action) {
      switch (action.type) {
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
        case "instructorImmediately":
          draft.instructor.hasErrors = false;
          draft.instructor.value = action.value;
          if (/\d/.test(draft.instructor.value)) {
            draft.instructor.hasErrors = true;
            draft.instructor.message = "Instructor cannot contain number.";
            return;
          }
          if (!/^[a-zA-Z]+$/.test(draft.instructor.value)) {
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

        // case "submitForm":
        //   if (!draft.firstName.hasErrors && !draft.middleName.hasErrors && !draft.lastName.hasErrors && !draft.streetAddress.hasErrors && !draft.city.hasErrors && !draft.province.hasErrors && !draft.zipCode.hasErrors && !draft.country.hasErrors && !draft.gender.hasErrors && !draft.age.hasErrors) {
        //     setContinueCount(1);
        //   }
        //   return;
      }
    }
  
    const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  
    // useEffect(() => {
    //   if (continueCount) {
    //     nextStep();
    //   }
    // }, [continueCount, nextStep]);
  
    // function nextHandler(e) {
    //   e.preventDefault();
  
    //   dispatch({ type: "firstNameImmediately", value: state.firstName.value });
    //   dispatch({ type: "middleNameImmediately", value: state.middleName.value });
    //   dispatch({ type: "lastNameImmediately", value: state.lastName.value });
    //   dispatch({ type: "genderImmediately", value: state.gender.value });
    //   dispatch({ type: "ageImmediately", value: state.age.value });
    //   dispatch({ type: "streetAddressImmediately", value: state.streetAddress.value });
    //   dispatch({ type: "cityImmediately", value: state.city.value });
    //   dispatch({ type: "provinceImmediately", value: state.province.value });
    //   dispatch({ type: "zipCodeImmediately", value: state.zipCode.value });
    //   dispatch({ type: "countryImmediately", value: state.country.value });
    //   dispatch({ type: "submitForm" });
    // }
  
    const onChangeStartDateHandler = input => {
        const year = new Date(input).getFullYear();
        let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
        let day = new Date(input).getDate().toString().padStart(2, "0");
    
        let date = month + "/" + day + "/" + year;
    
        setSelectedStartDate(input);
        // setInputStartDate(date);
    
        // if (date === "01/01/1970") {
        //   date = "";
        //   setInputStartDate("");
        // }
    
        dispatch({ type: "startDateImmediately", value: date });
      };

    const onChangeEndDateHandler = input => {
        const year = new Date(input).getFullYear();
        let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
        let day = new Date(input).getDate().toString().padStart(2, "0");
    
        let date = month + "/" + day + "/" + year;
    
        setSelectedEndDate(input);
        // setInputEndDate(date);
    
        // if (date === "01/01/1970") {
        //   date = "";
        //   setInputEndDate("");
        // }
    
        dispatch({ type: "endDateImmediately", value: date });
      };

    return (
        <Container title="Goal Details">
        <div className="row">
          <div className="col-md-4">
            <div className={`form-group row`}>
              <label class="col-sm-4 form-control-label">Category Name</label>
              <div class="col-sm-8 mb-3">
                <select name="account" class="form-control" value={values.CategoryName} onChange={e => inputChangeProgramDefault(e)}>
                  {values.categoryList.map(category => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`form-group row`}>
              <label class="col-sm-4 form-control-label">Programs List</label>
              <div class="col-sm-8 mb-3">
                <select name="account" class="form-control" value={values.ProgramName} onChange={inputChange("ProgramName")}>
                  {values.CategoryName === "Health" && values.healthList.map(value => <option>{value}</option>)}
                  {values.CategoryName === "Employment" && values.employmentList.map(value => <option>{value}</option>)}
                  {values.CategoryName === "Neighbourhood Net" && values.neighbourhoodList.map(value => <option>{value}</option>)}
                  {values.CategoryName === "Staff" && values.staffList.map(value => <option>{value}</option>)}
                  {values.CategoryName === "After School" && values.afterSchoolList.map(value => <option>{value}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            {/* <FormInput icon="fa fa-id-card-o" type="text" placeholder="Location" changeHandler={inputChange("Location")} value={values.Location} /> */}
            <FormInput icon="fas fa-address-card" type="text" placeholder="Location" changeHandler={inputChange("Location")} inputHandler={e => dispatch({ type: "locationImmediately", value: e.target.value })} message={state.location.message} inputField={state.location.hasErrors} />
          </div>
          <div className="col-md-4">
            {/* <FormInput icon="fas fa-user" type="text" placeholder="Instructor" changeHandler={inputChange("Instructor")} value={values.Instructor} /> */}
            <FormInput icon="fas fa-address-card" type="text" placeholder="Instructor" changeHandler={inputChange("Instructor")} inputHandler={e => dispatch({ type: "instructorImmediately", value: e.target.value })} message={state.instructor.message} inputField={state.instructor.hasErrors} />
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
                        <DatePicker className="form-control" selected={selectedStartDate} onChange={date => onChangeStartDateHandler(date)} placeholderText="Start Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
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
                        <DatePicker className="form-control" selected={selectedEndDate} onChange={date => onChangeEndDateHandler(date)}  placeholderText="End Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
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
    );
  }
  
  export default GoalDetails;
  