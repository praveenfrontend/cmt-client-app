import React from "react";
import FormInput from "../../FormFields/FormInput";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import FormCheckbox from "../../FormFields/FormCheckbox";

function ContactDetails({ values, inputChange, nextStep, prevStep, addChild, removeChild, inputChangeChildProgram, handleChangeChildProgram, page }) {
  return (
    <Page title="Contact Details">
      <div className="row">
        <div className="col-md-4">
          <FormInput icon="fas fa-mobile" type="number" placeholder="Mobile Phone" changeHandler={inputChange("cell_no")} value={values.cell_no} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Home Phone" changeHandler={inputChange("home_no")} value={values.home_no} />
        </div>
        <div className="col-md-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Work Phone" changeHandler={inputChange("work_no")} value={values.work_no} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-user" type="text" placeholder="Emergency Contact Name" changeHandler={inputChange("emergency_cntName")} value={values.emergency_cntName} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-phone" type="number" placeholder="Emergency Contact No." changeHandler={inputChange("emergency_contNo")} value={values.emergency_contNo} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-8">
          <FormInput icon="fas fa-envelope" type="text" placeholder="Email" changeHandler={inputChange("email_id")} value={values.email_id} />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <FormInput icon="fas fa-language" type="text" placeholder="First Language" changeHandler={inputChange("first_language")} value={values.first_language} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">How did you learn about us?</label>
          </div>
          <div className="col">
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxFriend" inputName="refer_through" inputValue="Friend" inputLabel="Friend" checkedValue={values.refer_through} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxWebsite" inputName="refer_through" inputValue="Website" inputLabel="Website" checkedValue={values.refer_through} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxNegibhour" inputName="refer_through" inputValue="Neighbhour" inputLabel="Neighbhour" checkedValue={values.refer_through} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxFlyer" inputName="refer_through" inputValue="Flyer" inputLabel="Flyer" checkedValue={values.refer_through} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxAgency" inputName="refer_through" inputValue="Agency" inputLabel="Agency" checkedValue={values.refer_through} />
            <FormRadio classNameValue="col-sm-5 col-md-3" changeHandler={inputChange("refer_through")} inputId="checkboxOther" inputName="refer_through" inputValue="Other" inputLabel="Other" checkedValue={values.refer_through} />
          </div>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-md-7 col-lg-6">
          <label className="text-muted mr-2">Information if Registration for a Child's program</label>
        </div>
        <div className="col-md-3 col-lg-6">
          <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("child_program")} inputId="childYes" inputName="child_program" inputValue="Yes" inputLabel="Yes" checkedValue={values.child_program} />
          <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("child_program")} inputId="childNo" inputName="child_program" inputValue="No" inputLabel="No" checkedValue={values.child_program} />
        </div>
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

      {values.childProgramAddRemove && values.child_program_rows.length ? (
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
                {values.child_program_rows.map((item, idx) => (
                  <tr id="addr0" key={idx}>
                    <td>{<FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={handleChangeChildProgram(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={values.child_program_rows[idx].isChecked} />}</td>
                    <td>
                      <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={handleChangeChildProgram(idx)} value={values.child_program_rows[idx].childFirstName} name="childFirstName" />
                    </td>
                    <td>
                      <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={handleChangeChildProgram(idx)} value={values.child_program_rows[idx].childLastName} name="childLastName" />
                    </td>
                    <td>
                      <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={handleChangeChildProgram(idx)} value={values.child_program_rows[idx].childBirthDate} name="childBirthDate" />
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
              <button className="btn btn-block btn-primary" onClick={nextStep}>
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
