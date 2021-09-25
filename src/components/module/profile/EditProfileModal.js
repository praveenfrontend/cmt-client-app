/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

import FormInput from "../../FormFields/FormInput";
import FormRadio from "../../FormFields/FormRadio";
import { CSSTransition } from "react-transition-group";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditProfileModal({ editModal, setEditModal, values }) {
  const [loading, setLoading] = useState(false);

  const[firstName, setFirstName] = useState("");
  const[middleName, setMiddleName] = useState("");
  const[lastName, setLastName] = useState("");
  const[email, setEmail] = useState("");
  const[phone, setPhone] = useState("");
  const[birthDate, setBirthDate] = useState("");
  const[gender, setGender] = useState("");
  const[city, setCity] = useState("");
  const[zipCode, setZip] = useState("");
  const[province, setProvince] = useState("");
  const[country, setCountry] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [inputDate, setInputDate] = useState("");

  const [submitCount, setSubmitCount] = useState(0);

  const initialState = {
    firstName: {
      value: values.firstName,
      hasErrors: false,
      message: "",
    },
    middleName: {
      value: values.middleName,
      hasErrors: false,
      message: "",
    },
    lastName: {
      value: values.lastName,
      hasErrors: false,
      message: "",
    },
    birthDate: {
      value: values.birthDate,
      hasErrors: false,
      message: ""
    },
    gender: {
      value: values.gender,
      hasErrors: false,
      message: "",
    },
    email: {
      value: values.email,
      hasErrors: false,
      message: "",
    },
    city: {
      value: values.city,
      hasErrors: false,
      message: "",
    },
    province: {
      value: values.province,
      hasErrors: false,
      message: "",
    },
    country: {
      value: values.country,
      hasErrors: false,
      message: "",
    },
    zipCode: {
      value: values.postal,
      hasErrors: false,
      message: "",
    },
    phone: {
      value: values.phone,
      hasErrors: false,
      message: "",
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "firstNameImmediately":
        draft.firstName.hasErrors = false;
        draft.firstName.value = action.value;
        if (/\d/.test(draft.firstName.value)) {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "Enter First name without numbers.";
          return;
        }
        if (draft.firstName.value === "") {
          draft.firstName.hasErrors = true;
          draft.firstName.message = "First Name cannot be empty.";
          return;
        }
        return;
      case "middleNameImmediately":
        draft.middleName.hasErrors = false;
        draft.middleName.value = action.value;
        if (/\d/.test(draft.middleName.value)) {
          draft.middleName.hasErrors = true;
          draft.middleName.message = "Enter Middle name without numbers.";
          return;
        }
        return;
      case "lastNameImmediately":
        draft.lastName.hasErrors = false;
        draft.lastName.value = action.value;
        if (/\d/.test(draft.lastName.value)) {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Enter First name without numbers.";
          return;
        }
        if (draft.lastName.value === "") {
          draft.lastName.hasErrors = true;
          draft.lastName.message = "Last Name cannot be empty.";
          return;
        }
        return;
      case "genderImmediately":
        draft.gender.hasErrors = false;
        draft.gender.value = action.value;
        if (draft.gender.value === undefined /* values.gender */) {
          draft.gender.hasErrors = true;
          draft.gender.message = "Select Gender.";
        }
        return;
      case "cityImmediately":
        draft.city.hasErrors = false;
        draft.city.value = action.value;
        if (/\d/.test(draft.city.value)) {
          draft.city.hasErrors = true;
          draft.city.message = "City cannot contain number.";
          return;
        }
        if (draft.city.value.length === 0) {
          draft.city.hasErrors = true;
          draft.city.message = "City cannot be empty.";
          return;
        }
        return;
      case "provinceImmediately":
        draft.province.hasErrors = false;
        draft.province.value = action.value;
        if (/\d/.test(draft.province.value)) {
          draft.province.hasErrors = true;
          draft.province.message = "Province cannot contain number.";
          return;
        }
        if (draft.province.value.length === 0) {
          draft.province.hasErrors = true;
          draft.province.message = "Province cannot be empty.";
          return;
        }
        return;
      case "zipCodeImmediately":
        draft.zipCode.hasErrors = false;
        draft.zipCode.value = action.value;
        if (draft.zipCode.value.length === 0) {
          draft.zipCode.hasErrors = true;
          draft.zipCode.message = "Postal code cannot be empty.";
          return;
        }
        if (!/^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}\d{1}[A-Za-z]{1}\d{1}$/.test(draft.zipCode.value)) {
          draft.zipCode.hasErrors = true;
          draft.zipCode.message = "Enter 6 alpha numeric characters postal code without space. Ex: K1A0B1";
          return;
        }
        return;
      case "phoneImmediately":
        draft.phone.hasErrors = false;
        draft.phone.value = action.value;
        if (draft.phone.value.length === 0) {
          draft.phone.hasErrors = true;
          draft.phone.message = "Contact number cannot be empty.";
          return;
        }
        if (!/^[0-9]{10}$/.test(draft.phone.value)) {
          draft.phone.hasErrors = true;
          draft.phone.message = "Enter 10 digits phone number.";
          return;
        }
        return;
      case "countryImmediately":
        draft.country.hasErrors = false;
        draft.country.value = action.value;
        if (draft.country.value === "") {
          draft.country.hasErrors = true;
          draft.country.message = "Country cannot be empty.";
          return;
        }
        return;
      
      case "birthDateImmediately":
        draft.birthDate.hasErrors = false;
        draft.birthDate.value = action.value;
        if (draft.birthDate.value === "") {
          draft.birthDate.hasErrors = true;
          draft.birthDate.message = "Birth Date Date cannot be empty.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.firstName.hasErrors && !draft.middleName.hasErrors && !draft.lastName.hasErrors && !draft.birthDate.hasErrors && !draft.gender.hasErrors && !draft.city.hasErrors && !draft.province.hasErrors && !draft.country.hasErrors && !draft.zipCode.hasErrors && !draft.phone.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const closeModalForm = () => {
    setEditModal(false);
  };

  useEffect(() => {
    setFirstName(values.firstName);
    setMiddleName(values.middleName);
    setLastName(values.lastName);
    setEmail(values.email);
    setPhone(values.phone);

    // const birthDate = values.birthDate;
    // const splitDate = birthDate.split("/");
    // const birthDay = splitDate[1]
    // const birthMonth = splitDate[0] - 1; 
    // const birthYear = splitDate[2];
    // const birthdayDate = dateConvertor(new Date(birthYear, birthMonth, birthDay))
    // setBirthDate(birthdayDate);
    setBirthDate(values.birthDate);

    setGender(values.gender);
    setCity(values.city);
    setZip(values.postal);
    setProvince(values.province);
    setCountry(values.country);
    
  }, [values])

  useEffect(() => {
    if (submitCount) {
      setLoading(true);
      async function updateProfile() {
        try {
          const response = await Axios.post("/profileUpdate", {firstName, middleName, lastName, email, phone, birthDate, gender, city, zipCode, province, country});
    
          if (response.data.success === true) {
            setLoading(false);
            setSubmitCount(0);
            closeModalForm();
            swal(response.data.message, "", "success").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } else {
            setLoading(false);
            setSubmitCount(0);
            closeModalForm();
            swal("Something went wrong", response.data.message, "warning").then(res => {
              setLoading(true);
              window.location.reload();
            });
          } 
        } catch (e) {
          setLoading(false);
          setSubmitCount(0);
          closeModalForm();
          swal("Something went wrong", e.response, "error").then(res => {
            setLoading(true);
            window.location.reload();
          });
        }
      }
      updateProfile();
    }
  }, [birthDate, city, closeModalForm, country, email, firstName, gender, lastName, middleName, phone, province, submitCount, zipCode]);

  function handleSubmit(e) {
    e.preventDefault();

    // dispatch({ type: "firstNameImmediately", value: state.firstName.value });
    // dispatch({ type: "middleNameImmediately", value: state.middleName.value });
    // dispatch({ type: "lastNameImmediately", value: state.lastName.value });
    // dispatch({ type: "genderImmediately", value: state.gender.value });
    // dispatch({ type: "birthDateImmediately", value: inputDate });
    // dispatch({ type: "phoneImmediately", value: state.phone.value });
    // dispatch({ type: "cityImmediately", value: state.city.value });
    // dispatch({ type: "provinceImmediately", value: state.province.value });
    // dispatch({ type: "zipCodeImmediately", value: state.zipCode.value });
    // dispatch({ type: "countryImmediately", value: state.country.value });
    dispatch({ type: "submitForm" });
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  const dateConvertor = input => {

    const year = new Date(input).getFullYear();
    let month = (new Date(input).getMonth() + 1).toString().padStart(2, "0");
    let day = new Date(input).getDate().toString().padStart(2, "0");
    let date = month + "/" + day + "/" + year;
    return date;
  }


  const onChangeDateHandler = input => {

    const date = dateConvertor(input);
    setSelectedDate(input);
    setInputDate(date);

    if (date === "01/01/1970") {
      date = "";
      setInputDate("");
    }

    dispatch({ type: "birthDateImmediately", value: date });
  };

  return (
    <LoadingOverlay active={loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
      <Modal show={editModal} onHide={closeModalForm} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-row">
              <div className="form-group col-md-4">
                <FormInput icon="fa fa-user"  type="text" placeholder="First Name" value={firstName} changeHandler={e => setFirstName(e.target.value)} inputHandler={e => dispatch({ type: "firstNameImmediately", value: e.target.value })} message={state.firstName.message} inputField={state.firstName.hasErrors} />
              </div>
              <div className="form-group col-md-4">
                <FormInput icon="fa fa-user" type="text" placeholder="Middle Name" value={middleName} changeHandler={e => setMiddleName(e.target.value)} inputHandler={e => dispatch({ type: "middleNameImmediately", value: e.target.value })} message={state.middleName.message} inputField={state.middleName.hasErrors} />
              </div>
              <div className="form-group col-md-4">
                <FormInput icon="fa fa-user" type="text" placeholder="Last Name" value={lastName} changeHandler={e => setLastName(e.target.value)} inputHandler={e => dispatch({ type: "lastNameImmediately", value: e.target.value })} message={state.lastName.message} inputField={state.lastName.hasErrors} />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group col-md-8">
                <FormInput disabled icon="fa fa-envelope" type="text" placeholder="Email" value={email} changeHandler={e => setEmail(e.target.value)} inputHandler={e => dispatch({ type: "emailImmediately", value: e.target.value })} message={state.email.message} inputField={state.email.hasErrors} />
              </div>
              <div className="form-group col-md-4">
                <FormInput icon="fa fa-phone" type="text" placeholder="Phone" value={phone} changeHandler={e => setPhone(e.target.value)} inputHandler={e => dispatch({ type: "phoneImmediately", value: e.target.value })} message={state.phone.message} inputField={state.phone.hasErrors} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                {<FormInput icon="fa fa-calendar" type="text" placeholder="BirthDate" value={birthDate} changeHandler={e => setBirthDate(e.target.value)} inputHandler={e => dispatch({ type: "birthDateImmediately", value: e.target.value })} message={state.birthDate.message} inputField={state.birthDate.hasErrors} />}
                {/* <div className="form-group">
                  <div className="input-group input-group-mb">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fas fa-calendar"></i>
                      </span>
                    </div>
                    <DatePicker className="form-control" selected={selectedDate} onChange={date => onChangeDateHandler(date)} placeholderText="Birth Date" dateFormat="MM/dd/yyyy" maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                  </div>
                  <CSSTransition in={state.birthDate.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.birthDate.message}</div>
                  </CSSTransition>
                </div> */}
              </div>
              <div className="form-group col-md-6">
                {/* <FormInput icon="fa fa-list-alt" type="text" placeholder="Gender" value={gender} changeHandler={e => setGender(e.target.value)} inputHandler={e => dispatch({ type: "genderImmediately", value: e.target.value })} message={state.gender.message} inputField={state.gender.hasErrors} /> */}
                  <div className="form-group d-flex">
                    <div>
                      <label className="text-muted mr-1">Gender</label>
                    </div>
                    <div className="d-flex">
                      <FormRadio changeHandler={e => setGender(e.target.value)} inputHandler={e => dispatch({ type: "genderImmediately", value: e.target.id })} inputId="male" inputName="gender" inputValue="Male" inputLabel="Male" checkedValue={gender} />
                      <FormRadio changeHandler={e => setGender(e.target.value)} inputHandler={e => dispatch({ type: "genderImmediately", value: e.target.id })} inputId="female" inputName="gender" inputValue="Female" inputLabel="Female" checkedValue={gender} />
                    </div>
                  </div>
                  <CSSTransition in={state.gender.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                    <div className="alert alert-danger small liveValidateMessage">{state.gender.message}</div>
                  </CSSTransition>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <FormInput icon="fa fa-address-card" type="text" placeholder="City" value={city} changeHandler={e => setCity(e.target.value)} inputHandler={e => dispatch({ type: "cityImmediately", value: e.target.value })} message={state.city.message} inputField={state.city.hasErrors} />
              </div>
              <div className="form-group col-md-6">
                <FormInput icon="fa fa-address-card" type="text" placeholder="Zip" value={zipCode} changeHandler={e => setZip(e.target.value)} inputHandler={e => dispatch({ type: "zipCodeImmediately", value: e.target.value })} message={state.zipCode.message} inputField={state.zipCode.hasErrors} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <FormInput icon="fa fa-address-card" type="text" placeholder="Province" value={province} changeHandler={e => setProvince(e.target.value)} inputHandler={e => dispatch({ type: "provinceImmediately", value: e.target.value })} message={state.province.message} inputField={state.province.hasErrors} />
              </div>
              <div className="form-group col-md-6">
                <FormInput disabled={true} icon="fa fa-address-card" type="text" placeholder="Country" value={country} changeHandler={e => setCountry(e.target.value)} inputHandler={e => dispatch({ type: "countryImmediately", value: e.target.value })} message={state.country.message} inputField={state.country.hasErrors} />
              </div>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-block btn-primary" onClick={e => handleSubmit(e)}>
            Update Profile
          </button>   
        </Modal.Footer>
      </Modal>
    </LoadingOverlay>
  );
}

export default EditProfileModal;
