import React from "react";

import FormInput from "../../FormInput";
import Page from "../../Page";
import FormRadio from "../../FormRadio";

function BasicDetails({ values, inputChange, nextStep, page }) {
  return (
    <div>
      <Page title="Basic Details">
        <div className="row">
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={inputChange("firstname")} value={values.firstname} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Middle Name" changeHandler={inputChange("middlename")} value={values.middlename} />
          </div>
          <div className="col-md-4">
            <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={inputChange("lastname")} value={values.lastname} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-4">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Gender</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("gender")} inputId="male" inputName="gender" inputValue="Male" inputLabel="Male" checkedValue={values.gender} />
                <FormRadio changeHandler={inputChange("gender")} inputId="female" inputName="gender" inputValue="Female" inputLabel="Female" checkedValue={values.gender} />
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 ">
            <div className="form-group d-flex">
              <div>
                <label className="text-muted mr-2">Age</label>
              </div>
              <div>
                <FormRadio changeHandler={inputChange("age")} inputId="upto12" inputName="age" inputValue="Child upto 12" inputLabel="Child upto 12" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputId="13to25" inputName="age" inputValue="Youth 13-25" inputLabel="Youth 13-25" checkedValue={values.age} />
                <FormRadio changeHandler={inputChange("age")} inputId="above25" inputName="age" inputValue="Adult Over 25" inputLabel="Adult Over 25" checkedValue={values.age} />
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
            <FormInput icon="fas fa-address-card" type="number" placeholder="Postal code" changeHandler={inputChange("postal_code")} value={values.postal_code} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-address-card" type="text" placeholder="Country" changeHandler={inputChange("country")} value={values.country} />
          </div>
        </div>
        {page === "IRF" ? (
          <>
            <br />
            <div className="row justify-content-center">
              <div className="col col-sm-4 col-md-3 col-lg-2">
                <button className="btn btn-block btn-primary" onClick={nextStep}>
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
