import React from "react";
import FormInput from "../../../FormFields/FormInput";
import Page from "../../../common/Page";

function ContactDetails({ values, inputChange }) {
  return (
    <Page title="Contact Details">
      <div className="row">
        <div className="col-md-4">
          <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("phoneCell")} value={values.phoneCell} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("phoneHome")} value={values.phoneHome} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("phoneWork")} value={values.phoneWork} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("EmerContactName")} value={values.EmerContactName} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("EmerContactNo")} value={values.EmerContactNo} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email")} value={values.email} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("firstLang")} value={values.firstLang} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="notes" className="text-muted">
          Agent Notes
        </label>
        <textarea className="form-control col col-md-10" id="notes" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("notes")} value={values.notes}></textarea>
      </div>
    </Page>
  );
}

export default ContactDetails;
