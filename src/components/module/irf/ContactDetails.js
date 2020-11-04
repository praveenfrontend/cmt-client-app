import React from "react";
import FormInput from "../../FormInput";
import Page from "../../Page";
import FormRadio from "../../FormRadio";

function ContactDetails({ values, inputChange, nextStep, prevStep }) {
  function continueButton(e) {
    e.preventDefault();
    nextStep();
  }

  function back(e) {
    e.preventDefault();
    prevStep();
  }

  return (
    <Page title="Contact Details" progress={40}>
      <div className="row">
        <div className="col-md-4">
          <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("mobilePhone")} value={values.mobilePhone} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("homePhone")} value={values.homePhone} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("workPhone")} value={values.workPhone} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("emergencyContactName")} value={values.emergencyContactName} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("emergencyContactNumber")} value={values.emergencyContactNumber} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} value={values.email} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLanguage")} value={values.firstLanguage} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">How did you learn about us?</label>
          </div>
          <div className="col">
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxFriend" inputName="aboutUs" inputValue="Friend" inputLabel="Friend" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxWebsite" inputName="aboutUs" inputValue="Website" inputLabel="Website" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxNegibhour" inputName="aboutUs" inputValue="Neighbhour" inputLabel="Neighbhour" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxFlyer" inputName="aboutUs" inputValue="Flyer" inputLabel="Flyer" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxAgency" inputName="aboutUs" inputValue="Agency" inputLabel="Agency" checkedValue={values.aboutUs} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("aboutUs")} inputId="checkboxOther" inputName="aboutUs" inputValue="Other" inputLabel="Other" checkedValue={values.aboutUs} />
          </div>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-md-7 col-lg-6">
          <label className="text-muted mr-2">Information if Registration for a Child's program</label>
        </div>
        <div className="col-md-3 col-lg-6">
          <FormRadio classNameValue="" changeHandler={inputChange("childProgram")} inputId="childYes" inputName="childProgram" inputValue="Yes" inputLabel="Yes" checkedValue={values.childProgram} />
          <FormRadio classNameValue="" changeHandler={inputChange("childProgram")} inputId="childNo" inputName="childProgram" inputValue="No" inputLabel="No" checkedValue={values.childProgram} />
        </div>
      </div>

      <br />
      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-danger" onClick={back}>
            Back
          </button>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-primary" onClick={continueButton}>
            Continue
          </button>
        </div>
      </div>
    </Page>
  );
}

export default ContactDetails;
