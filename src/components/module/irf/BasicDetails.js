import React from "react";

import FormInput from "../../FormInput";
import Page from "../../Page";
import FormRadio from "../../FormRadio";

function BasicDetails({ values, inputChange, nextStep }) {
  function continueButton(e) {
    e.preventDefault();
    nextStep();
  }

  return (
    <div>
      <Page title="Basic Details" progress={20}>
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={inputChange("firstName")} value={values.firstName} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Middle Name" changeHandler={inputChange("middleName")} value={values.middleName} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={inputChange("lastName")} value={values.lastName} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Gender</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("gender")} inputId="male" inputValue="gender" inputLabel="Male" checkedValue={values.gender} />
                <FormRadio changeHandler={inputChange("gender")} inputId="female" inputValue="gender" inputLabel="Female" checkedValue={values.gender} />
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 ">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Age</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("age")} inputId="upto12" inputValue="age" inputLabel="Child upto 12" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputId="13to25" inputValue="age" inputLabel="Youth 13-25" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputId="above25" inputValue="age" inputLabel="Adult Over 25" checkedValue={values.age} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Enter your street address" changeHandler={inputChange("address")} value={values.address} />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="City" changeHandler={inputChange("city")} value={values.city} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Province" changeHandler={inputChange("province")} value={values.province} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="number" placeholder="Postal code" changeHandler={inputChange("postal")} value={values.postal} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Country" changeHandler={inputChange("country")} value={values.country} />
          </div>
        </div>

        <br />
        <div className="row justify-content-center">
          <div className="col col-sm-4 col-md-3 col-lg-2">
            <button className="btn btn-block btn-primary" onClick={continueButton}>
              Continue
            </button>
          </div>
        </div>
      </Page>
    </div>
  );
}

export default BasicDetails;
