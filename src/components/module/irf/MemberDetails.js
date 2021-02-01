import React from "react";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import FormInput from "../../FormFields/FormInput";

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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputId="myHealth_poor" inputName="myHealth" inputValue="Poor" inputLabel="Poor" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputId="myHealth_fair" inputName="myHealth" inputValue="Fair" inputLabel="Fair" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputId="myHealth_good" inputName="myHealth" inputValue="Good" inputLabel="Good" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputId="myHealth_very_good" inputName="myHealth" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputId="myHealth_excellent" inputName="myHealth" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myHealth} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputId="myLifeSatisfaction_poor" inputName="myLifeSatisfaction" inputValue="Poor" inputLabel="Poor" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputId="myLifeSatisfaction_fair" inputName="myLifeSatisfaction" inputValue="Fair" inputLabel="Fair" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputId="myLifeSatisfaction_good" inputName="myLifeSatisfaction" inputValue="Good" inputLabel="Good" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputId="myLifeSatisfaction_very_good" inputName="myLifeSatisfaction" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputId="myLifeSatisfaction_excellent" inputName="myLifeSatisfaction" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myLifeSatisfaction} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputId="mySocialNetwork_poor" inputName="mySocialNetwork" inputValue="Poor" inputLabel="Poor" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputId="mySocialNetwork_fair" inputName="mySocialNetwork" inputValue="Fair" inputLabel="Fair" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputId="mySocialNetwork_good" inputName="mySocialNetwork" inputValue="Good" inputLabel="Good" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputId="mySocialNetwork_very_good" inputName="mySocialNetwork" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputId="mySocialNetwork_excellent" inputName="mySocialNetwork" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.mySocialNetwork} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputId="myCommunityNetwork_poor" inputName="myCommunityNetwork" inputValue="Poor" inputLabel="Poor" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputId="myCommunityNetwork_fair" inputName="myCommunityNetwork" inputValue="Fair" inputLabel="Fair" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputId="myCommunityNetwork_good" inputName="myCommunityNetwork" inputValue="Good" inputLabel="Good" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputId="myCommunityNetwork_very_good" inputName="myCommunityNetwork" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputId="myCommunityNetwork_excellent" inputName="myCommunityNetwork" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myCommunityNetwork} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputId="myStressLevel_high" inputName="myStressLevel" inputValue="High" inputLabel="High" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputId="myStressLevel_lot" inputName="myStressLevel" inputValue="Quite a lot" inputLabel="Quite a lot" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputId="myStressLevel_depends" inputName="myStressLevel" inputValue="Depends" inputLabel="Depends" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputId="myStressLevel_manageable" inputName="myStressLevel" inputValue="Manageable" inputLabel="Manageable" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputId="myStressLevel_low" inputName="myStressLevel" inputValue="Low" inputLabel="Low" checkedValue={values.myStressLevel} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputId="myHealthIssues_never" inputName="myHealthIssues" inputValue="Never" inputLabel="Never" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputId="myHealthIssues_urgent" inputName="myHealthIssues" inputValue="When it is urgent" inputLabel="When it is urgent" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputId="myHealthIssues_upset" inputName="myHealthIssues" inputValue="If I am upset" inputLabel="If I am upset" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputId="myHealthIssues_sometimes" inputName="myHealthIssues" inputValue="Sometimes" inputLabel="Sometimes" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputId="myHealthIssues_all_time" inputName="myHealthIssues" inputValue="All the time" inputLabel="All the time" checkedValue={values.myHealthIssues} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myFamilyDoctor")} inputId="myFamilyDoctor_yes" inputName="myFamilyDoctor" inputValue="Yes" inputLabel="Yes" checkedValue={values.myFamilyDoctor} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myFamilyDoctor")} inputId="myFamilyDoctor_no" inputName="myFamilyDoctor" inputValue="No" inputLabel="No" checkedValue={values.myFamilyDoctor} />
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
            <FormInput icon="fas fa-hospital" type="number" placeholder="Family Doctor" changeHandler={inputChange("myVisitToFamilyDoctor")} value={values.myVisitToFamilyDoctor} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Walk in Clinic" changeHandler={inputChange("myVisitToClinic")} value={values.myVisitToClinic} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Emergency Room" changeHandler={inputChange("myVisitToEmergency")} value={values.myVisitToEmergency} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Hospital" changeHandler={inputChange("myVisitToHospital")} value={values.myVisitToHospital} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myDiseaseAwareness")} inputId="myDiseaseAwareness_yes" inputName="myDiseaseAwareness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myDiseaseAwareness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myDiseaseAwareness")} inputId="myDiseaseAwareness_no" inputName="myDiseaseAwareness" inputValue="No" inputLabel="No" checkedValue={values.myDiseaseAwareness} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCmtProgramAwareness")} inputId="myCmtProgramAwareness_yes" inputName="myCmtProgramAwareness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myCmtProgramAwareness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCmtProgramAwareness")} inputId="myCmtProgramAwareness_no" inputName="myCmtProgramAwareness" inputValue="No" inputLabel="No" checkedValue={values.myCmtProgramAwareness} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myPhysicalActiveness")} inputId="myPhysicalActiveness_yes" inputName="myPhysicalActiveness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myPhysicalActiveness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myPhysicalActiveness")} inputId="myPhysicalActiveness_no" inputName="myPhysicalActiveness" inputValue="No" inputLabel="No" checkedValue={values.myPhysicalActiveness} />
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
