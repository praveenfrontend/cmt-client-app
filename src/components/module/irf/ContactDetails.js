/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import FormInput from "../../FormFields/FormInput";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import FormCheckbox from "../../FormFields/FormCheckbox";
import { CSSTransition } from "react-transition-group";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ContactDetails({ values, inputChange, nextStep, prevStep, addChild, removeChild, inputChangeChildProgram, handleChangeChildProgram, page, handleChangeChildProgramDate }) {
  const [continueCount, setContinueCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");

  const initialState = {
    phoneCell: {
      value: "",
      hasErrors: false,
      message: ""
    },
    phoneHome: {
      value: "",
      hasErrors: false,
      message: ""
    },
    phoneWork: {
      value: "",
      hasErrors: false,
      message: ""
    },
    EmerContactName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    EmerContactNo: {
      value: "",
      hasErrors: false,
      message: ""
    },
    email: {
      value: "",
      hasErrors: false,
      message: ""
    },
    firstLang: {
      value: "",
      hasErrors: false,
      message: ""
    },
    aboutUs: {
      value: "",
      hasErrors: false,
      message: ""
    },
    ChildValue: {
      value: "",
      hasErrors: false,
      message: ""
    } /* ,
    childFirstName: {
      value: "",
      hasErrors: false,
      message: ""
    } */
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "phoneCellImmediately":
        draft.phoneCell.hasErrors = false;
        draft.phoneCell.value = action.value;
        if (values.phoneCell.length === 0) {
          draft.phoneCell.hasErrors = true;
          draft.phoneCell.message = "Mobile Phone cannot be empty.";
          return;
        }
        if (!/^[0-9]{10}$/.test(values.phoneCell)) {
          draft.phoneCell.hasErrors = true;
          draft.phoneCell.message = "Enter 10 digits phone number.";
          return;
        }
        return;
      case "phoneHomeImmediately":
        draft.phoneHome.hasErrors = false;
        draft.phoneHome.value = action.value;
        if (values.phoneHome.length === 0) {
          draft.phoneHome.hasErrors = true;
          draft.phoneHome.message = "Home Phone cannot be empty.";
          return;
        }
        if (!/^[0-9]{10}$/.test(values.phoneHome)) {
          draft.phoneHome.hasErrors = true;
          draft.phoneHome.message = "Enter 10 digits phone number.";
          return;
        }
        return;
      case "phoneWorkImmediately":
        draft.phoneWork.hasErrors = false;
        draft.phoneWork.value = action.value;
        if (values.phoneWork.length === 0) {
          draft.phoneWork.hasErrors = true;
          draft.phoneWork.message = "Work Phone cannot be empty.";
          return;
        }
        if (!/^[0-9]{10}$/.test(values.phoneWork)) {
          draft.phoneWork.hasErrors = true;
          draft.phoneWork.message = "Enter 10 digits phone number.";
          return;
        }
        return;
      case "EmerContactNameImmediately":
        draft.EmerContactName.hasErrors = false;
        draft.EmerContactName.value = action.value;
        if (/\d/.test(values.EmerContactName)) {
          draft.EmerContactName.hasErrors = true;
          draft.EmerContactName.message = "Contact name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.EmerContactName)) {
          draft.EmerContactName.hasErrors = true;
          draft.EmerContactName.message = "Contact name cannot be empty.";
          return;
        }
        return;
      case "EmerContactNoImmediately":
        draft.EmerContactNo.hasErrors = false;
        draft.EmerContactNo.value = action.value;
        if (values.EmerContactNo.length === 0) {
          draft.EmerContactNo.hasErrors = true;
          draft.EmerContactNo.message = "Contact number cannot be empty.";
          return;
        }
        if (!/^[0-9]{10}$/.test(values.EmerContactNo)) {
          draft.EmerContactNo.hasErrors = true;
          draft.EmerContactNo.message = "Enter 10 digits phone number.";
          return;
        }
        return;
      case "emailImmediately":
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        if (values.email.length === 0) {
          draft.email.hasErrors = true;
          draft.email.message = "Email cannot be empty.";
          return;
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z]+)$/.test(values.email)) {
          draft.email.hasErrors = true;
          draft.email.message = "Provide a valid email.";
        }
        return;
      case "firstLangImmediately":
        draft.firstLang.hasErrors = false;
        draft.firstLang.value = action.value;
        if (/\d/.test(values.firstLang)) {
          draft.firstLang.hasErrors = true;
          draft.firstLang.message = "First Language cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.firstLang)) {
          draft.firstLang.hasErrors = true;
          draft.firstLang.message = "First Language cannot be empty.";
          return;
        }
        return;
      case "aboutUsImmediately":
        draft.aboutUs.hasErrors = false;
        draft.aboutUs.value = action.value;
        if (draft.aboutUs.value === values.aboutUs) {
          draft.aboutUs.hasErrors = true;
          draft.aboutUs.message = "Select about us.";
        }
        return;
      case "ChildValueImmediately":
        draft.ChildValue.hasErrors = false;
        draft.ChildValue.value = action.value;
        if (draft.ChildValue.value === values.ChildValue) {
          draft.ChildValue.hasErrors = true;
          draft.ChildValue.message = "Select child's program.";
        }
        return;
      case "childFirstNameImmediately":
        draft.childFirstName.hasErrors = false;
        draft.childFirstName.value = action.value;
        if (/\d/.test(values.childFirstName)) {
          draft.childFirstName.hasErrors = true;
          draft.childFirstName.message = "Child First name cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.childFirstName)) {
          draft.childFirstName.hasErrors = true;
          draft.childFirstName.message = "Child First name cannot be empty.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.phoneCell.hasErrors && !draft.phoneHome.hasErrors && !draft.phoneWork.hasErrors && !draft.EmerContactName.hasErrors && !draft.EmerContactNo.hasErrors && !draft.email.hasErrors && !draft.firstLang.hasErrors && !draft.aboutUs.hasErrors && !draft.ChildValue.hasErrors /* && !draft.childFirstNameImmediately.hasErrors */) {
          setContinueCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (continueCount) {
      nextStep();
    }
  }, [continueCount, nextStep]);

  function nextHandler(e) {
    e.preventDefault();

    dispatch({ type: "phoneCellImmediately", value: state.phoneCell.value });
    dispatch({ type: "phoneHomeImmediately", value: state.phoneHome.value });
    dispatch({ type: "phoneWorkImmediately", value: state.phoneWork.value });
    dispatch({ type: "EmerContactNameImmediately", value: state.EmerContactName.value });
    dispatch({ type: "EmerContactNoImmediately", value: state.EmerContactNo.value });
    dispatch({ type: "emailImmediately", value: state.email.value });
    dispatch({ type: "firstLangImmediately", value: state.firstLang.value });
    dispatch({ type: "aboutUsImmediately", value: state.aboutUs.value });
    dispatch({ type: "ChildValueImmediately", value: state.ChildValue.value });
    // dispatch({ type: "childFirstNameImmediately", value: state.childFirstName.value });
    dispatch({ type: "submitForm" });
  }

  const onChangeDateHandler = (input, idx) => {
    const year = new Date(input).getFullYear();
    let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
    let day = new Date(input).getDate().toString().padStart(2, "0");
    let date = month + "/" + day + "/" + year;

    setSelectedDate(input);
    handleChangeChildProgramDate(idx, "childBirthDate", date);
    
    // dispatch({ type: "birthDateImmediately", value: date });
  };

  return (
    <Page title="Contact Details">
      <div className="row">
        <div className="col-md-4">
          <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("phoneCell")} inputHandler={e => dispatch({ type: "phoneCellImmediately", value: e.target.value })} message={state.phoneCell.message} inputField={state.phoneCell.hasErrors} value={values.phoneCell} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("phoneHome")} inputHandler={e => dispatch({ type: "phoneHomeImmediately", value: e.target.value })} message={state.phoneHome.message} inputField={state.phoneHome.hasErrors} value={values.phoneHome} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("phoneWork")} inputHandler={e => dispatch({ type: "phoneWorkImmediately", value: e.target.value })} message={state.phoneWork.message} inputField={state.phoneWork.hasErrors} value={values.phoneWork} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("EmerContactName")} inputHandler={e => dispatch({ type: "EmerContactNameImmediately", value: e.target.value })} message={state.EmerContactName.message} inputField={state.EmerContactName.hasErrors} value={values.EmerContactName} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("EmerContactNo")} inputHandler={e => dispatch({ type: "EmerContactNoImmediately", value: e.target.value })} message={state.EmerContactNo.message} inputField={state.EmerContactNo.hasErrors} value={values.EmerContactNo} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} inputHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} value={values.email} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLang")} inputHandler={e => dispatch({ type: "firstLangImmediately", value: e.target.value })} message={state.firstLang.message} inputField={state.firstLang.hasErrors} value={values.firstLang} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">How did you learn about us?</label>
          </div>
          <div className="col">
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxFriend" inputName="aboutUs" inputValue="Friend" inputLabel="Friend" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxWebsite" inputName="aboutUs" inputValue="Website" inputLabel="Website" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxNegibhour" inputName="aboutUs" inputValue="Neighbhour" inputLabel="Neighbhour" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxFlyer" inputName="aboutUs" inputValue="Flyer" inputLabel="Flyer" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxAgency" inputName="aboutUs" inputValue="Agency" inputLabel="Agency" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputHandler={e => dispatch({ type: "aboutUsImmediately", value: e.target.id })} inputId="checkboxOther" inputName="aboutUs" inputValue="Other" inputLabel="Other" checkedValue={values.aboutUs} />
          </div>
          <CSSTransition in={state.aboutUs.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="alert alert-danger small liveValidateMessage">{state.aboutUs.message}</div>
          </CSSTransition>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-md-7 col-lg-6">
          <label className="text-muted mr-2">Information if Registration for a Child's program</label>
        </div>
        <div className="col-md-3 col-lg-6">
          <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("ChildValue")} inputHandler={e => dispatch({ type: "ChildValueImmediately", value: e.target.id })} inputId="childYes" inputName="ChildValue" inputValue="Yes" inputLabel="Yes" checkedValue={values.ChildValue} />
          <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("ChildValue")} inputHandler={e => dispatch({ type: "ChildValueImmediately", value: e.target.id })} inputId="childNo" inputName="ChildValue" inputValue="No" inputLabel="No" checkedValue={values.ChildValue} />
        </div>
        <CSSTransition in={state.ChildValue.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.ChildValue.message}</div>
        </CSSTransition>
      </div>

      {values.childProgramAddRemove ? (
        <div className="row form-group">
          <div className="col col-sm-4 col-md-3 col-lg-2">
            <button className="btn  btn-outline-success" onClick={addChild}>
              Add Child
            </button>
          </div>
          <div className="col col-sm-4 col-md-3 col-lg-2">
            <button className="btn  btn-outline-danger" onClick={removeChild}>
              Remove Child
            </button>
          </div>
        </div>
      ) : null}

      {values.childProgramAddRemove && values.child_program.length ? (
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Select</th>
                  <th scope="col">Child First Name</th>
                  <th scope="col">Child Last Name</th>
                  <th scope="col">Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {values.child_program.map((item, idx) => (
                  <tr id="addr0" key={idx}>
                    <td>{<FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={handleChangeChildProgram(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={values.child_program[idx].isChecked} />}</td>
                    <td className="col-md-3">
                      <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={handleChangeChildProgram(idx)} /* inputHandler={e => dispatch({ type: "childFirstNameImmediately", value: e.target.value })} message={state.childFirstName.message} inputField={state.childFirstName.hasErrors} */ value={values.child_program[idx].childFirstName} name="childFirstName" />
                    </td>
                    <td className="col-md-3">
                      <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={handleChangeChildProgram(idx)} value={values.child_program[idx].childLastName} name="childLastName" />
                    </td>
                    <td className="col-md-5">
                      <div className="form-group">
                        <div className="input-group input-group-mb ">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">
                                <i className="fas fa-calendar"></i>
                                </span>
                            </div>
                            <DatePicker className="form-control" selected={selectedDate} onChange={date => onChangeDateHandler(date, idx)} value={values.child_program[idx].childBirthDate} name="childBirthDate"  placeholderText="MM/DD/YYYY" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      {page === "IRF" ? (
        <>
          <br />
          <div className="row justify-content-center">
            <div className="col col-sm-4 col-md-3 col-lg-2">
              <button className="btn btn-block btn-danger" onClick={prevStep}>
                Back
              </button>
            </div>
            <div className="col col-sm-4 col-md-3 col-lg-2">
              <button className="btn btn-block btn-primary" onClick={nextHandler}>
                Continue
              </button>
            </div>
          </div>
        </>
      ) : null}
    </Page>
  );
}

export default ContactDetails;
