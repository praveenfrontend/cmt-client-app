/* eslint-disable default-case */
import React from "react";
import { useImmerReducer } from "use-immer";

import FormInput from "../../../FormFields/FormInput";
import Page from "../../../common/Page";
import { CSSTransition } from "react-transition-group";

function ContactDetails({ values, inputChange }) {

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
    notes: {
      value: "",
      hasErrors: false,
      message: ""
    }
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
      case "notesImmediately":
        draft.notes.hasErrors = false;
        draft.notes.value = action.value;
        if (values.notes.length === 0) {
          draft.notes.hasErrors = true;
          draft.notes.message = "Others, if any cannot be empty.";
          return;
        }
        return;
      // case "submitForm":
      //   if (!draft.phoneCell.hasErrors && !draft.phoneHome.hasErrors && !draft.phoneWork.hasErrors && !draft.EmerContactName.hasErrors && !draft.EmerContactNo.hasErrors && !draft.email.hasErrors && !draft.firstLang.hasErrors && !draft.aboutUs.hasErrors && !draft.ChildValue.hasErrors /* && !draft.childFirstNameImmediately.hasErrors */) {
      //   }
      //   return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  
  return (
    <Page title="Contact Details">
      <div className="row">
        <div className="col-md-4">
          {/* <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("phoneCell")} value={values.phoneCell} /> */}
          <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("phoneCell")} inputHandler={e => dispatch({ type: "phoneCellImmediately", value: e.target.value })} message={state.phoneCell.message} inputField={state.phoneCell.hasErrors} value={values.phoneCell} />
        </div>
        <div className="col-md-4">
          {/* <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("phoneHome")} value={values.phoneHome} /> */}
          <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("phoneHome")} inputHandler={e => dispatch({ type: "phoneHomeImmediately", value: e.target.value })} message={state.phoneHome.message} inputField={state.phoneHome.hasErrors} value={values.phoneHome} />
        </div>
        <div className="col-md-4">
          {/* <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("phoneWork")} value={values.phoneWork} /> */}
          <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("phoneWork")} inputHandler={e => dispatch({ type: "phoneWorkImmediately", value: e.target.value })} message={state.phoneWork.message} inputField={state.phoneWork.hasErrors} value={values.phoneWork} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          {/* <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("EmerContactName")} value={values.EmerContactName} /> */}
          <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("EmerContactName")} inputHandler={e => dispatch({ type: "EmerContactNameImmediately", value: e.target.value })} message={state.EmerContactName.message} inputField={state.EmerContactName.hasErrors} value={values.EmerContactName} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          {/* <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("EmerContactNo")} value={values.EmerContactNo} /> */}
          <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("EmerContactNo")} inputHandler={e => dispatch({ type: "EmerContactNoImmediately", value: e.target.value })} message={state.EmerContactNo.message} inputField={state.EmerContactNo.hasErrors} value={values.EmerContactNo} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          {/* <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} value={values.email} /> */}
          <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} inputHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} value={values.email} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          {/* <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLang")} value={values.firstLang} /> */}
          <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLang")} inputHandler={e => dispatch({ type: "firstLangImmediately", value: e.target.value })} message={state.firstLang.message} inputField={state.firstLang.hasErrors} value={values.firstLang} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes" className="text-muted">
          Agent Notes
        </label>
        {/* <textarea className="form-control col col-md-10" id="notes" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("notes")} value={values.notes}></textarea> */}
        <textarea className="form-control col col-md-10" id="notes" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("notes")} onInput={e => dispatch({ type: "notesImmediately", value: e.target.value })} message={state.notes.message} inputField={state.notes.hasErrors} value={values.notes}></textarea>
        <CSSTransition in={state.notes.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.notes.message}</div>
        </CSSTransition>
      </div>
    </Page>
  );
}

export default ContactDetails;
