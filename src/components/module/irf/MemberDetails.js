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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthPoor" inputValue="memberHealth" inputLabel="Poor" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthFair" inputValue="memberHealth" inputLabel="Fair" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthGood" inputValue="memberHealth" inputLabel="Good" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthVeryGood" inputValue="memberHealth" inputLabel="Very Good" checkedValue={values.memberHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberHealth")} inputId="memberHealthExcellent" inputValue="memberHealth" inputLabel="Excellent" checkedValue={values.memberHealth} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionPoor" inputValue="memberSatisfaction" inputLabel="Poor" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionFair" inputValue="memberSatisfaction" inputLabel="Fair" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionGood" inputValue="memberSatisfaction" inputLabel="Good" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionVeryGood" inputValue="memberSatisfaction" inputLabel="Very Good" checkedValue={values.memberSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSatisfaction")} inputId="memberSatisfactionExcellent" inputValue="memberSatisfaction" inputLabel="Excellent" checkedValue={values.memberSatisfaction} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkPoor" inputValue="memberSocialNetwork" inputLabel="Poor" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkFair" inputValue="memberSocialNetwork" inputLabel="Fair" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkGood" inputValue="memberSocialNetwork" inputLabel="Good" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkVeryGood" inputValue="memberSocialNetwork" inputLabel="Very Good" checkedValue={values.memberSocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberSocialNetwork")} inputId="memberSocialNetworkExcellent" inputValue="memberSocialNetwork" inputLabel="Excellent" checkedValue={values.memberSocialNetwork} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionPoor" inputValue="memberConnection" inputLabel="Poor" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionFair" inputValue="memberConnection" inputLabel="Fair" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionGood" inputValue="memberConnection" inputLabel="Good" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionVeryGood" inputValue="memberConnection" inputLabel="Very Good" checkedValue={values.memberConnection} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberConnection")} inputId="memberConnectionExcellent" inputValue="memberConnection" inputLabel="Excellent" checkedValue={values.memberConnection} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressHigh" inputValue="memberStress" inputLabel="High" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressLot" inputValue="memberStress" inputLabel="Quite a lot" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressDepends" inputValue="memberStress" inputLabel="Depends" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressManageable" inputValue="memberStress" inputLabel="Manageable" checkedValue={values.memberStress} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberStress")} inputId="memberStressLow" inputValue="memberStress" inputLabel="Low" checkedValue={values.memberStress} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthNever" inputValue="memberPersonalHealth" inputLabel="Never" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthUrgent" inputValue="memberPersonalHealth" inputLabel="When it is urgent" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthUpset" inputValue="memberPersonalHealth" inputLabel="If I am upset" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthSometimes" inputValue="memberPersonalHealth" inputLabel="Sometimes" checkedValue={values.memberPersonalHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberPersonalHealth")} inputId="memberPersonalHealthAllTime" inputValue="memberPersonalHealth" inputLabel="All the time" checkedValue={values.memberPersonalHealth} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyDoctor")} inputId="memberFamilyDoctorYes" inputValue="memberFamilyDoctor" inputLabel="Yes" checkedValue={values.memberFamilyDoctor} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyDoctor")} inputId="memberFamilyDoctorNo" inputValue="memberFamilyDoctor" inputLabel="No" checkedValue={values.memberFamilyDoctor} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberRiskFactors")} inputId="memberRiskFactorsYes" inputValue="memberRiskFactors" inputLabel="Yes" checkedValue={values.memberRiskFactors} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberRiskFactors")} inputId="memberRiskFactorsNo" inputValue="memberRiskFactors" inputLabel="No" checkedValue={values.memberRiskFactors} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyhealthyLiving")} inputId="memberFamilyhealthyLivingYes" inputValue="memberFamilyhealthyLiving" inputLabel="Yes" checkedValue={values.memberFamilyhealthyLiving} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyhealthyLiving")} inputId="memberFamilyhealthyLivingNo" inputValue="memberFamilyhealthyLiving" inputLabel="No" checkedValue={values.memberFamilyhealthyLiving} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyPhysicallyActive")} inputId="memberFamilyPhysicallyActiveYes" inputValue="memberFamilyPhysicallyActive" inputLabel="Yes" checkedValue={values.memberFamilyPhysicallyActive} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("memberFamilyPhysicallyActive")} inputId="memberFamilyPhysicallyActiveNo" inputValue="memberFamilyPhysicallyActive" inputLabel="No" checkedValue={values.memberFamilyPhysicallyActive} />
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
