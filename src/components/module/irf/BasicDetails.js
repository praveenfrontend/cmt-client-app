/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";

import FormInput from "../../FormFields/FormInput";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import { CSSTransition } from "react-transition-group";

function BasicDetails({ values, inputChange, nextStep, page }) {
  const [continueCount, setContinueCount] = useState(0);

  const initialState = {
    firstName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    middleName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    lastName: {
      value: "",
      hasErrors: false,
      message: ""
    },
    gender: {
      value: "",
      hasErrors: false,
      message: ""
    },
    age: {
      value: "",
      hasErrors: false,
      message: ""
    },
    streetAddress: {
      value: "",
      hasErrors: false,
      message: ""
    },
    city: {
      value: "",
      hasErrors: false,
      message: ""
    },
    province: {
      value: "",
      hasErrors: false,
      message: ""
    },
    zipCode: {
      value: "",
      hasErrors: false,
      message: ""
    },
    country: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "firstNameImmediately":
        draft.firstName.hasErrors = false;
        draft.firstName.value = action.value;
        if (/\d/.test(values.firstName)) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "Enter first name without numbers.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.firstName)) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "First name cannot be empty.";
          return;
        }
        return;
      case "middleNameImmediately":
        draft.middleName.hasErrors = false;
        draft.middleName.value = action.value;
        if (/\d/.test(values.middleName)) {
          draft.middleName.hasErrors = true;
          draft.middleName.message = "Enter middle name without numbers.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.middleName)) {
          draft.middleName.hasErrors = true;
          draft.middleName.message = "Middle name cannot be empty.";
          return;
        }
        return;
      case "lastNameImmediately":
        draft.lastName.hasErrors = false;
        draft.lastName.value = action.value;
        if (/\d/.test(values.lastName)) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Enter last name without numbers.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.lastName)) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Last name cannot be empty.";
          return;
        }
        return;
      case "genderImmediately":
        draft.gender.hasErrors = false;
        draft.gender.value = action.value;
        if (draft.gender.value === values.gender) {
          draft.gender.hasErrors = true;
          draft.gender.message = "Select Gender.";
        }
        return;
      case "ageImmediately":
        draft.age.hasErrors = false;
        draft.age.value = action.value;
        if (draft.age.value === values.age) {
          draft.age.hasErrors = true;
          draft.age.message = "Select Age.";
        }
        return;
      case "streetAddressImmediately":
        draft.streetAddress.hasErrors = false;
        draft.streetAddress.value = action.value;
        if (values.streetAddress.length < 5) {
          draft.streetAddress.hasErrors = true;
          draft.streetAddress.message = "Street Address should be minimum 5 characters";
          return;
        }
        if (values.streetAddress.length === 0) {
          draft.streetAddress.hasErrors = true;
          draft.streetAddress.message = "Street Address cannot be empty.";
          return;
        }
        return;
      case "cityImmediately":
        draft.city.hasErrors = false;
        draft.city.value = action.value;
        if (/\d/.test(values.city)) {
          draft.city.hasErrors = true;
          draft.city.message = "City cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.city)) {
          draft.city.hasErrors = true;
          draft.city.message = "City cannot be empty.";
          return;
        }
        return;
      case "provinceImmediately":
        draft.province.hasErrors = false;
        draft.province.value = action.value;
        if (/\d/.test(values.province)) {
          draft.province.hasErrors = true;
          draft.province.message = "Province cannot contain number.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.province)) {
          draft.province.hasErrors = true;
          draft.province.message = "Province cannot be empty.";
          return;
        }
        return;
      case "zipCodeImmediately":
        draft.zipCode.hasErrors = false;
        draft.zipCode.value = action.value;
        if (values.zipCode.length === 0) {
          draft.zipCode.hasErrors = true;
          draft.zipCode.message = "Postal code cannot be empty.";
          return;
        }
        if (!/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}\d{1}[A-Za-z]{1}\d{1}$/.test(values.zipCode)) {
          draft.zipCode.hasErrors = true;
          draft.zipCode.message = "Enter 6 alpha numeric characters postal code without space. Ex: K1A0B1";
          return;
        }
        return;
      case "countryImmediately":
        draft.country.hasErrors = false;
        draft.country.value = action.value;
        if (!values.country.toLowerCase() === "canada") {
          draft.country.hasErrors = true;
          draft.country.message = "Enter Canada.";
          return;
        }
        if (!/^[a-zA-Z]+$/.test(values.country)) {
          draft.country.hasErrors = true;
          draft.country.message = "Country cannot be empty.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.firstName.hasErrors && !draft.middleName.hasErrors && !draft.lastName.hasErrors && !draft.streetAddress.hasErrors && !draft.city.hasErrors && !draft.province.hasErrors && !draft.zipCode.hasErrors && !draft.country.hasErrors && !draft.gender.hasErrors && !draft.age.hasErrors) {
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

    dispatch({ type: "firstNameImmediately", value: state.firstName.value });
    dispatch({ type: "middleNameImmediately", value: state.middleName.value });
    dispatch({ type: "lastNameImmediately", value: state.lastName.value });
    dispatch({ type: "genderImmediately", value: state.gender.value });
    dispatch({ type: "ageImmediately", value: state.age.value });
    dispatch({ type: "streetAddressImmediately", value: state.streetAddress.value });
    dispatch({ type: "cityImmediately", value: state.city.value });
    dispatch({ type: "provinceImmediately", value: state.province.value });
    dispatch({ type: "zipCodeImmediately", value: state.zipCode.value });
    dispatch({ type: "countryImmediately", value: state.country.value });
    dispatch({ type: "submitForm" });
  }

  return (
    <div>
      <Page title="Basic Details">
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={inputChange("firstName")} inputHandler={e => dispatch({ type: "firstNameImmediately", value: e.target.value })} message={state.firstName.message} inputField={state.firstName.hasErrors} value={values.firstName} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Middle Name" changeHandler={inputChange("middleName")} inputHandler={e => dispatch({ type: "middleNameImmediately", value: e.target.value })} message={state.middleName.message} inputField={state.middleName.hasErrors} value={values.middleName} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={inputChange("lastName")} inputHandler={e => dispatch({ type: "lastNameImmediately", value: e.target.value })} message={state.lastName.message} inputField={state.lastName.hasErrors} value={values.lastName} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Gender</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("gender")} inputHandler={e => dispatch({ type: "genderImmediately", value: e.target.id })} inputId="male" inputName="gender" inputValue="Male" inputLabel="Male" checkedValue={values.gender} />
                <FormRadio changeHandler={inputChange("gender")} inputHandler={e => dispatch({ type: "genderImmediately", value: e.target.id })} inputId="female" inputName="gender" inputValue="Female" inputLabel="Female" checkedValue={values.gender} />
              </div>
            </div>
            <CSSTransition in={state.gender.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.gender.message}</div>
            </CSSTransition>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 ">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Age</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("age")} inputHandler={e => dispatch({ type: "ageImmediately", value: e.target.id })} inputId="upto12" inputName="age" inputValue="Child upto 12" inputLabel="Child upto 12" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputHandler={e => dispatch({ type: "ageImmediately", value: e.target.id })} inputId="13to25" inputName="age" inputValue="Youth 13-25" inputLabel="Youth 13-25" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputHandler={e => dispatch({ type: "ageImmediately", value: e.target.id })} inputId="above25" inputName="age" inputValue="Adult Over 25" inputLabel="Adult Over 25" checkedValue={values.age} />
              </div>
            </div>
            <CSSTransition in={state.age.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
              <div className="alert alert-danger small liveValidateMessage">{state.age.message}</div>
            </CSSTransition>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Enter your street address" changeHandler={inputChange("streetAddress")} inputHandler={e => dispatch({ type: "streetAddressImmediately", value: e.target.value })} message={state.streetAddress.message} inputField={state.streetAddress.hasErrors} value={values.streetAddress} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="City" changeHandler={inputChange("city")} inputHandler={e => dispatch({ type: "cityImmediately", value: e.target.value })} message={state.city.message} inputField={state.city.hasErrors} value={values.city} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Province" changeHandler={inputChange("province")} inputHandler={e => dispatch({ type: "provinceImmediately", value: e.target.value })} message={state.province.message} inputField={state.province.hasErrors} value={values.province} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Zip code" changeHandler={inputChange("zipCode")} inputHandler={e => dispatch({ type: "zipCodeImmediately", value: e.target.value })} message={state.zipCode.message} inputField={state.zipCode.hasErrors} value={values.zipCode} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Country" changeHandler={inputChange("country")} inputHandler={e => dispatch({ type: "countryImmediately", value: e.target.value })} message={state.country.message} inputField={state.country.hasErrors} value={values.country} disabled />
          </div>
        </div>
        {page === "IRF" ? (
          <>
            <br />
            <div className="row justify-content-center">
              <div className="col col-sm-4 col-md-3 col-lg-2">
                <button className="btn btn-block btn-primary" onClick={nextHandler}>
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : null}
      </Page>
    </div>
  );
}

export default BasicDetails;
