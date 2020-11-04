import React from "react";
import Page from "../../Page";
import FormRadio from "../../FormRadio";
import FormCheckbox from "../../FormCheckbox";

function CommunityMattersProgram({ values, inputChange, inputCheckBoxHandler, nextStep, prevStep }) {
  function continueButton(e) {
    e.preventDefault();
    nextStep();
  }

  function back(e) {
    e.preventDefault();
    prevStep();
  }

  return (
    <Page title="Community Matters Program" progress={60}>
      <div className="row">
        <div className="col">
          <label className="text-muted">Please Select the following if you are registering</label>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-md-7 col-lg-6">
          <label className="text-muted mr-2">After School Program (3:30 - 6):</label>
        </div>
        <div className="col-md-3 col-lg-6">
          <FormRadio changeHandler={inputChange("afterSchoolProgram")} inputId="afterSchoolProgramYes" inputName="afterSchoolProgram" inputValue="Yes" inputLabel="Yes" checkedValue={values.afterSchoolProgram} />
          <FormRadio changeHandler={inputChange("afterSchoolProgram")} inputId="afterSchoolProgramNo" inputName="afterSchoolProgram" inputValue="No" inputLabel="No" checkedValue={values.afterSchoolProgram} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Health:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthZumba" inputValue="healthZumba" inputLabel="Zumba" checkedValue={values.health.healthZumba.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthYoga" inputValue="healthYoga" inputLabel="Yoga" checkedValue={values.health.healthYoga.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthDental" inputValue="healthDental" inputLabel="Dental" checkedValue={values.health.healthDental.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthKarate" inputValue="healthKarate" inputLabel="Karate" checkedValue={values.health.healthKarate.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthMeditation" inputValue="healthMeditation" inputLabel="Meditation" checkedValue={values.health.healthMeditation.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthFoodMarket" inputValue="healthFoodMarket" inputLabel="Food Market" checkedValue={values.health.healthFoodMarket.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthBellyDancing" inputValue="healthBellyDancing" inputLabel="Belly Dancing" checkedValue={values.health.healthBellyDancing.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthAdultPlus" inputValue="healthAdultPlus" inputLabel="Adult Plus" checkedValue={values.health.healthAdultPlus.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthEnglishCafe" inputValue="healthEnglishCafe" inputLabel="English Cafe" checkedValue={values.health.healthEnglishCafe.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthBasicEnglish" inputValue="healthBasicEnglish" inputLabel="Basic English" checkedValue={values.health.healthBasicEnglish.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthHomeVistits" inputValue="healthHomeVistits" inputLabel="Home Vistits" checkedValue={values.health.healthHomeVistits.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthSocialGroup" inputValue="healthSocialGroup" inputLabel="Social Group" checkedValue={values.health.healthSocialGroup.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthHealthySmiles" inputValue="healthHealthySmiles" inputLabel="Healthy Smiles" checkedValue={values.health.healthHealthySmiles.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthVolleyBall" inputValue="healthVolleyBall" inputLabel="Volley Ball" checkedValue={values.health.healthVolleyBall.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthHeartAndStroke" inputValue="healthHeartAndStroke" inputLabel="Heart and Stroke" checkedValue={values.health.healthHeartAndStroke.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthBollywoodDance" inputValue="healthBollywoodDance" inputLabel="Bollywood Dance" checkedValue={values.health.healthBollywoodDance.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthFoodShareBus" inputValue="healthFoodShareBus" inputLabel="Food Share Bus" checkedValue={values.health.healthFoodShareBus.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthDieticianSessions" inputValue="healthDieticianSessions" inputLabel="Dietician Sessions" checkedValue={values.health.healthDieticianSessions.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthFoodHandling" inputValue="healthFoodHandling" inputLabel="Food Handling" checkedValue={values.health.healthFoodHandling.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthAdultNutrition" inputValue="healthAdultNutrition" inputLabel="Adult Nutrition" checkedValue={values.health.healthAdultNutrition.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthDiabetesSessions" inputValue="healthDiabetesSessions" inputLabel="Diabetes Sessions" checkedValue={values.health.healthDiabetesSessions.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthHealthyChoices" inputValue="healthHealthyChoices" inputLabel="Healthy Choices" checkedValue={values.health.healthHealthyChoices.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthHomeManagement" inputValue="healthHomeManagement" inputLabel="Home Management" checkedValue={values.health.healthHomeManagement.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthStressManagement" inputValue="healthStressManagement" inputLabel="Stress Management" checkedValue={values.health.healthStressManagement.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthCancerScreeningSpa" inputValue="healthCancerScreeningSpa" inputLabel="Cancer Screening/Spa" checkedValue={values.health.healthCancerScreeningSpa.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthDiabetesManagement" inputValue="healthealthDiabetesManagementh" inputLabel="Diabetes Management" checkedValue={values.health.healthDiabetesManagement.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthSwimmingChildren" inputValue="healthSwimmingChildren" inputLabel="Swimming Children" checkedValue={values.health.healthSwimmingChildren.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthSwimmingLadies" inputValue="healthSwimmingLadies" inputLabel="Swimming Ladies" checkedValue={values.health.healthSwimmingLadies.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthSwimmingAquaFitMale" inputValue="healthSwimmingAquaFitMale" inputLabel="Swimming AquaFit Male" checkedValue={values.health.healthSwimmingAquaFitMale.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("health")} inputId="healthSwimmingAquaFitFemale" inputValue="healthSwimmingAquaFitFemale" inputLabel="Swimming AquaFit Female" checkedValue={values.health.healthSwimmingAquaFitFemale.isChecked} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Employment:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="tutoring" inputValue="tutoring" inputLabel="Tutoring" checkedValue={values.employment.tutoring.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="jobClub" inputValue="jobClub" inputLabel="Job Club" checkedValue={values.employment.jobClub.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="childMinding" inputValue="childMinding" inputLabel="Child Minding" checkedValue={values.employment.childMinding.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="computerBasic" inputValue="computerBasic" inputLabel="Computer Basic" checkedValue={values.employment.computerBasic.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="citizenshipRefugees" inputValue="citizenshipRefugees" inputLabel="Citizenship/Refugees" checkedValue={values.employment.citizenshipRefugees.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="communityAssistant" inputValue="communityAssistant" inputLabel="Community Assistant" checkedValue={values.employment.communityAssistant.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="computerIntermediate" inputValue="computerIntermediate" inputLabel="Computer Intermediate" checkedValue={values.employment.computerIntermediate.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="interestedInVolunteering" inputValue="interestedInVolunteering" inputLabel="Interested in Volunteering" checkedValue={values.employment.interestedInVolunteering.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="publicSpeaking" inputValue="publicSpeaking" inputLabel="Public Speaking Level 1 & 2" checkedValue={values.employment.publicSpeaking.isChecked} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("employment")} inputId="foreignTrainedHealthProfessionals" inputValue="foreignTrainedHealthProfessionals" inputLabel="Foreign Trained Health Professionals" checkedValue={values.employment.foreignTrainedHealthProfessionals.isChecked} />
          </div>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-1 col-lg-1 mr-1">
          <label className="text-muted">Staff:</label>
        </div>
        <div className="col-sm-7 col-lg-4">
          <FormRadio changeHandler={inputChange("staff")} inputId="staffVolunteer" inputName="staff" inputValue="Volunteer" inputLabel="Volunteer" checkedValue={values.staff} />
          <FormRadio changeHandler={inputChange("staff")} inputId="staffCommunityAssistant" inputName="staff" inputValue="Community Assistant" inputLabel="Community Assistant" checkedValue={values.staff} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Neighbourhood Net:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood")} inputId="neighbourhoodCitizenship" inputValue="neighbourhoodCitizenship" inputLabel="Citizenship" checkedValue={values.neighbourhood.neighbourhoodCitizenship.isChecked} />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood")} inputId="neighbourhoodIncomeTax" inputValue="neighbourhoodIncomeTax" inputLabel="IncomeTax" checkedValue={values.neighbourhood.neighbourhoodIncomeTax.isChecked} />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood")} inputId="neighbourhoodOther" inputValue="neighbourhoodOther" inputLabel="Other" checkedValue={values.neighbourhood.neighbourhoodOther.isChecked} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="othersTextArea" className="text-muted">
          Others, if any
        </label>
        <textarea className="form-control col col-md-6" id="othersTextArea" rows="2" col="10" placeholder="Your interests" onChange={inputChange("othersTextArea")} value={values.othersTextArea}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="agentNotesTextArea" className="text-muted">
          Agent Notes
        </label>
        <textarea className="form-control col col-md-10" id="agentNotesTextArea" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("agentNotesTextArea")} value={values.agentNotesTextArea}></textarea>
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

export default CommunityMattersProgram;
