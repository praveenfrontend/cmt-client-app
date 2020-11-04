import React from "react";
import Page from "../../Page";
import FormRadio from "../../FormRadio";
import FormInput from "../../FormInput";

function MemberDetails({ values, inputChange, nextStep, prevStep }) {
  function continueButton(e) {
    e.preventDefault();
    nextStep();
  }

  function back(e) {
    e.preventDefault();
    prevStep();
  }

  return (
    <Page title="Member Details" progress={80}>
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthPoor" inputName="memberHealth" inputValue="Poor" inputLabel="Poor" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthFair" inputName="memberHealth" inputValue="Fair" inputLabel="Fair" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthGood" inputName="memberHealth" inputValue="Good" inputLabel="Good" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthVeryGood" inputName="memberHealth" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthExcellent" inputName="memberHealth" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.memberHealth} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionPoor" inputName="memberSatisfaction" inputValue="Poor" inputLabel="Poor" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionFair" inputName="memberSatisfaction" inputValue="Fair" inputLabel="Fair" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionGood" inputName="memberSatisfaction" inputValue="Good" inputLabel="Good" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionVeryGood" inputName="memberSatisfaction" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionExcellent" inputName="memberSatisfaction" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.memberSatisfaction} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkPoor" inputName="memberSocialNetwork" inputValue="Poor" inputLabel="Poor" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkFair" inputName="memberSocialNetwork" inputValue="Fair" inputLabel="Fair" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkGood" inputName="memberSocialNetwork" inputValue="Good" inputLabel="Good" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkVeryGood" inputName="memberSocialNetwork" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkExcellent" inputName="memberSocialNetwork" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.memberSocialNetwork} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionPoor" inputName="memberConnection" inputValue="Poor" inputLabel="Poor" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionFair" inputName="memberConnection" inputValue="Fair" inputLabel="Fair" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionGood" inputName="memberConnection" inputValue="Good" inputLabel="Good" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionVeryGood" inputName="memberConnection" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionExcellent" inputName="memberConnection" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.memberConnection} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressHigh" inputName="memberStress" inputValue="High" inputLabel="High" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressLot" inputName="memberStress" inputValue="Quite a lot" inputLabel="Quite a lot" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressDepends" inputName="memberStress" inputValue="Depends" inputLabel="Depends" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressManageable" inputName="memberStress" inputValue="Manageable" inputLabel="Manageable" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressLow" inputName="memberStress" inputValue="Low" inputLabel="Low" checkedValue={values.memberStress} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthNever" inputName="memberPersonalHealth" inputValue="Never" inputLabel="Never" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthUrgent" inputName="memberPersonalHealth" inputValue="When it is urgent" inputLabel="When it is urgent" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthUpset" inputName="memberPersonalHealth" inputValue="If I am upset" inputLabel="If I am upset" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthSometimes" inputName="memberPersonalHealth" inputValue="Sometimes" inputLabel="Sometimes" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthAllTime" inputName="memberPersonalHealth" inputValue="All the time" inputLabel="All the time" checkedValue={values.memberPersonalHealth} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyDoctor")} inputId="memberFamilyDoctorYes" inputName="memberFamilyDoctor" inputValue="Yes" inputLabel="Yes" checkedValue={values.memberFamilyDoctor} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyDoctor")} inputId="memberFamilyDoctorNo" inputName="memberFamilyDoctor" inputValue="No" inputLabel="No" checkedValue={values.memberFamilyDoctor} />
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
            <FormInput icon="fas fa-hospital" type="number" placeholder="Family Doctor" changeHandler={inputChange("memberFamilyVisitFamilyDoctor")} value={values.memberFamilyVisitFamilyDoctor} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Walk in Clinic" changeHandler={inputChange("memberFamilyVisitClinic")} value={values.memberFamilyVisitClinic} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Emergency Room" changeHandler={inputChange("memberFamilyVisitEmergencyRoom")} value={values.memberFamilyVisitEmergencyRoom} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Hospital" changeHandler={inputChange("memberFamilyVisitHospital")} value={values.memberFamilyVisitHospital} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberRiskFactors")} inputId="memberRiskFactorsYes" inputName="memberRiskFactors" inputValue="Yes" inputLabel="Yes" checkedValue={values.memberRiskFactors} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberRiskFactors")} inputId="memberRiskFactorsNo" inputName="memberRiskFactors" inputValue="No" inputLabel="No" checkedValue={values.memberRiskFactors} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyhealthyLiving")} inputId="memberFamilyhealthyLivingYes" inputName="memberFamilyhealthyLiving" inputValue="Yes" inputLabel="Yes" checkedValue={values.memberFamilyhealthyLiving} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyhealthyLiving")} inputId="memberFamilyhealthyLivingNo" inputName="memberFamilyhealthyLiving" inputValue="No" inputLabel="No" checkedValue={values.memberFamilyhealthyLiving} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyPhysicallyActive")} inputId="memberFamilyPhysicallyActiveYes" inputName="memberFamilyPhysicallyActive" inputValue="Yes" inputLabel="Yes" checkedValue={values.memberFamilyPhysicallyActive} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyPhysicallyActive")} inputId="memberFamilyPhysicallyActiveNo" inputName="memberFamilyPhysicallyActive" inputValue="No" inputLabel="No" checkedValue={values.memberFamilyPhysicallyActive} />
          </div>
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

export default MemberDetails;
