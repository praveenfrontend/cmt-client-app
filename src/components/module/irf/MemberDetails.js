import React from "react";
import Page from "../../Page";
import FormRadio from "../../FormRadio";
import FormInput from "../../FormInput";

function MemberDetails({ values, inputChange, nextStep, prevStep }) {
  return (
    <Page title="Member Details">
      <div className="row">
        <div className="col">
          <label className="text-muted">Please Select accordingly</label>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">Overall I think my health is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_1")} inputId="ques_1_poor" inputName="ques_1" inputValue="Poor" inputLabel="Poor" checkedValue={values.ques_1} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_1")} inputId="ques_1_fair" inputName="ques_1" inputValue="Fair" inputLabel="Fair" checkedValue={values.ques_1} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_1")} inputId="ques_1_good" inputName="ques_1" inputValue="Good" inputLabel="Good" checkedValue={values.ques_1} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_1")} inputId="ques_1_very_good" inputName="ques_1" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.ques_1} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_1")} inputId="ques_1_excellent" inputName="ques_1" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.ques_1} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My satisfaction with my life is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_2")} inputId="ques_2_poor" inputName="ques_2" inputValue="Poor" inputLabel="Poor" checkedValue={values.ques_2} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_2")} inputId="ques_2_fair" inputName="ques_2" inputValue="Fair" inputLabel="Fair" checkedValue={values.ques_2} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_2")} inputId="ques_2_good" inputName="ques_2" inputValue="Good" inputLabel="Good" checkedValue={values.ques_2} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_2")} inputId="ques_2_very_good" inputName="ques_2" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.ques_2} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_2")} inputId="ques_2_excellent" inputName="ques_2" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.ques_2} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My social networks of family and friends are:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_3")} inputId="ques_3_poor" inputName="ques_3" inputValue="Poor" inputLabel="Poor" checkedValue={values.ques_3} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_3")} inputId="ques_3_fair" inputName="ques_3" inputValue="Fair" inputLabel="Fair" checkedValue={values.ques_3} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_3")} inputId="ques_3_good" inputName="ques_3" inputValue="Good" inputLabel="Good" checkedValue={values.ques_3} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_3")} inputId="ques_3_very_good" inputName="ques_3" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.ques_3} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_3")} inputId="ques_3_excellent" inputName="ques_3" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.ques_3} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My level of connection with my community is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_4")} inputId="ques_4_poor" inputName="ques_4" inputValue="Poor" inputLabel="Poor" checkedValue={values.ques_4} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_4")} inputId="ques_4_fair" inputName="ques_4" inputValue="Fair" inputLabel="Fair" checkedValue={values.ques_4} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_4")} inputId="ques_4_good" inputName="ques_4" inputValue="Good" inputLabel="Good" checkedValue={values.ques_4} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_4")} inputId="ques_4_very_good" inputName="ques_4" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.ques_4} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_4")} inputId="ques_4_excellent" inputName="ques_4" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.ques_4} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My level of stress is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_5")} inputId="ques_5_high" inputName="ques_5" inputValue="High" inputLabel="High" checkedValue={values.ques_5} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_5")} inputId="ques_5_lot" inputName="ques_5" inputValue="Quite a lot" inputLabel="Quite a lot" checkedValue={values.ques_5} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_5")} inputId="ques_5_depends" inputName="ques_5" inputValue="Depends" inputLabel="Depends" checkedValue={values.ques_5} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_5")} inputId="ques_5_manageable" inputName="ques_5" inputValue="Manageable" inputLabel="Manageable" checkedValue={values.ques_5} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_5")} inputId="ques_5_low" inputName="ques_5" inputValue="Low" inputLabel="Low" checkedValue={values.ques_5} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I can talk to others about my personal health issues:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_6")} inputId="ques_6_never" inputName="ques_6" inputValue="Never" inputLabel="Never" checkedValue={values.ques_6} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_6")} inputId="ques_6_urgent" inputName="ques_6" inputValue="When it is urgent" inputLabel="When it is urgent" checkedValue={values.ques_6} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_6")} inputId="ques_6_upset" inputName="ques_6" inputValue="If I am upset" inputLabel="If I am upset" checkedValue={values.ques_6} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_6")} inputId="ques_6_sometimes" inputName="ques_6" inputValue="Sometimes" inputLabel="Sometimes" checkedValue={values.ques_6} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_6")} inputId="ques_6_all_time" inputName="ques_6" inputValue="All the time" inputLabel="All the time" checkedValue={values.ques_6} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">Do you have a family doctor?</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_7")} inputId="ques_7_yes" inputName="ques_7" inputValue="Yes" inputLabel="Yes" checkedValue={values.ques_7} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_7")} inputId="ques_7_no" inputName="ques_7" inputValue="No" inputLabel="No" checkedValue={values.ques_7} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">Number of times each year I visit:</label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Family Doctor" changeHandler={inputChange("family_doctor")} value={values.family_doctor} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Walk in Clinic" changeHandler={inputChange("walkin_clinic")} value={values.walkin_clinic} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Emergency Room" changeHandler={inputChange("emergency_room")} value={values.emergency_room} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Hospital" changeHandler={inputChange("hospital")} value={values.hospital} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I am aware of the risk factors for diabetes, cancer and cardiovascular disease:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_8")} inputId="ques_8_yes" inputName="ques_8" inputValue="Yes" inputLabel="Yes" checkedValue={values.ques_8} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_8")} inputId="ques_8_no" inputName="ques_8" inputValue="No" inputLabel="No" checkedValue={values.ques_8} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I am aware of facilities, programs, parks, playgrounds within community for healthy living and physical activity:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_9")} inputId="ques_9_yes" inputName="ques_9" inputValue="Yes" inputLabel="Yes" checkedValue={values.ques_9} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_9")} inputId="ques_9_no" inputName="ques_9" inputValue="No" inputLabel="No" checkedValue={values.ques_9} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I am physically active (exercise atleast 3 times a week for 1 hour):</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_10")} inputId="ques_10_yes" inputName="ques_10" inputValue="Yes" inputLabel="Yes" checkedValue={values.ques_10} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("ques_10")} inputId="ques_10_no" inputName="ques_10" inputValue="No" inputLabel="No" checkedValue={values.ques_10} />
          </div>
        </div>
      </div>

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
    </Page>
  );
}

export default MemberDetails;
