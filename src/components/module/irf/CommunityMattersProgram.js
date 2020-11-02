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
          <FormRadio changeHandler={inputChange("afterSchoolProgram")} inputId="afterSchoolProgramYes" inputValue="afterSchoolProgram" inputLabel="Yes" checkedValue={values.afterSchoolProgram} />
          <FormRadio changeHandler={inputChange("afterSchoolProgram")} inputId="afterSchoolProgramNo" inputValue="afterSchoolProgram" inputLabel="No" checkedValue={values.afterSchoolProgram} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Health:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthZumba")} inputId="healthZumba" inputValue="healthZumba" inputLabel="Zumba" checkedValue={values.healthZumba} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthYoga")} inputId="healthYoga" inputValue="healthYoga" inputLabel="Yoga" checkedValue={values.healthYoga} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthDental")} inputId="healthDental" inputValue="healthDental" inputLabel="Dental" checkedValue={values.healthDental} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthKarate")} inputId="healthKarate" inputValue="healthKarate" inputLabel="Karate" checkedValue={values.healthKarate} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthMeditation")} inputId="healthMeditation" inputValue="healthMeditation" inputLabel="Meditation" checkedValue={values.healthMeditation} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthFoodMarket")} inputId="healthFoodMarket" inputValue="healthFoodMarket" inputLabel="Food Market" checkedValue={values.healthFoodMarket} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthBellyDancing")} inputId="healthBellyDancing" inputValue="healthBellyDancing" inputLabel="Belly Dancing" checkedValue={values.healthBellyDancing} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthAdultPlus")} inputId="healthAdultPlus" inputValue="healthAdultPlus" inputLabel="Adult Plus" checkedValue={values.healthAdultPlus} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthEnglishCafe")} inputId="healthEnglishCafe" inputValue="healthEnglishCafe" inputLabel="English Cafe" checkedValue={values.healthEnglishCafe} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthBasicEnglish")} inputId="healthBasicEnglish" inputValue="healthBasicEnglish" inputLabel="Basic English" checkedValue={values.healthBasicEnglish} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthHomeVistits")} inputId="healthHomeVistits" inputValue="healthHomeVistits" inputLabel="Home Vistits" checkedValue={values.healthHomeVistits} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthSocialGroup")} inputId="healthSocialGroup" inputValue="healthSocialGroup" inputLabel="Social Group" checkedValue={values.healthSocialGroup} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthHealthySmiles")} inputId="healthHealthySmiles" inputValue="healthHealthySmiles" inputLabel="Healthy Smiles" checkedValue={values.healthHealthySmiles} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthVolleyBall")} inputId="healthVolleyBall" inputValue="healthVolleyBall" inputLabel="Volley Ball" checkedValue={values.healthVolleyBall} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthHeartAndStroke")} inputId="healthHeartAndStroke" inputValue="healthHeartAndStroke" inputLabel="Heart and Stroke" checkedValue={values.healthHeartAndStroke} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthBollywoodDance")} inputId="healthBollywoodDance" inputValue="healthBollywoodDance" inputLabel="Bollywood Dance" checkedValue={values.healthBollywoodDance} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthFoodShareBus")} inputId="healthFoodShareBus" inputValue="healthFoodShareBus" inputLabel="Food Share Bus" checkedValue={values.healthFoodShareBus} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthDieticianSessions")} inputId="healthDieticianSessions" inputValue="healthDieticianSessions" inputLabel="Dietician Sessions" checkedValue={values.healthDieticianSessions} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthFoodHandling")} inputId="healthFoodHandling" inputValue="healthFoodHandling" inputLabel="Food Handling" checkedValue={values.healthFoodHandling} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthAdultNutrition")} inputId="healthAdultNutrition" inputValue="healthAdultNutrition" inputLabel="Adult Nutrition" checkedValue={values.healthAdultNutrition} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthDiabetesSessions")} inputId="healthDiabetesSessions" inputValue="healthDiabetesSessions" inputLabel="Diabetes Sessions" checkedValue={values.healthDiabetesSessions} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthHealthyChoices")} inputId="healthHealthyChoices" inputValue="healthHealthyChoices" inputLabel="Healthy Choices" checkedValue={values.healthHealthyChoices} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthHomeManagement")} inputId="healthHomeManagement" inputValue="healthHomeManagement" inputLabel="Home Management" checkedValue={values.healthHomeManagement} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthStressManagement")} inputId="healthStressManagement" inputValue="healthStressManagement" inputLabel="Stress Management" checkedValue={values.healthStressManagement} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthCancerScreeningSpa")} inputId="healthCancerScreeningSpa" inputValue="healthCancerScreeningSpa" inputLabel="Cancer Screening/Spa" checkedValue={values.healthCancerScreeningSpa} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthDiabetesManagement")} inputId="healthDiabetesManagement" inputValue="healthealthDiabetesManagementh" inputLabel="Diabetes Management" checkedValue={values.healthDiabetesManagement} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthSwimmingChildren")} inputId="healthSwimmingChildren" inputValue="healthSwimmingChildren" inputLabel="Swimming Children" checkedValue={values.healthSwimmingChildren} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthSwimmingLadies")} inputId="healthSwimmingLadies" inputValue="healthSwimmingLadies" inputLabel="Swimming Ladies" checkedValue={values.healthSwimmingLadies} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthSwimmingAquaFitMale")} inputId="healthSwimmingAquaFitMale" inputValue="healthSwimmingAquaFitMale" inputLabel="Swimming AquaFit Male" checkedValue={values.healthSwimmingAquaFitMale} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthSwimmingAquaFitFemale")} inputId="healthSwimmingAquaFitFemale" inputValue="healthSwimmingAquaFitFemale" inputLabel="Swimming AquaFit Female" checkedValue={values.healthSwimmingAquaFitFemale} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Employment:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("healthTutoring")} inputId="healthTutoring" inputValue="healthTutoring" inputLabel="Tutoring" checkedValue={values.healthTutoring} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("jobClub")} inputId="jobClub" inputValue="jobClub" inputLabel="Job Club" checkedValue={values.jobClub} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("childMinding")} inputId="childMinding" inputValue="childMinding" inputLabel="Child Minding" checkedValue={values.childMinding} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("computerBasic")} inputId="computerBasic" inputValue="computerBasic" inputLabel="Computer Basic" checkedValue={values.computerBasic} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("citizenshipRefugees")} inputId="citizenshipRefugees" inputValue="citizenshipRefugees" inputLabel="Citizenship/Refugees" checkedValue={values.citizenshipRefugees} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("communityAssistant")} inputId="communityAssistant" inputValue="communityAssistant" inputLabel="Community Assistant" checkedValue={values.communityAssistant} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("computerIntermediate")} inputId="computerIntermediate" inputValue="computerIntermediate" inputLabel="Computer Intermediate" checkedValue={values.computerIntermediate} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("interestedInVolunteering")} inputId="interestedInVolunteering" inputValue="interestedInVolunteering" inputLabel="Interested in Volunteering" checkedValue={values.interestedInVolunteering} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("publicSpeaking")} inputId="publicSpeaking" inputValue="publicSpeaking" inputLabel="Public Speaking Level 1 & 2" checkedValue={values.publicSpeaking} />
            <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={inputCheckBoxHandler("foreignTrainedHealthProfessionals")} inputId="foreignTrainedHealthProfessionals" inputValue="foreignTrainedHealthProfessionals" inputLabel="Foreign Trained Health Professionals" checkedValue={values.foreignTrainedHealthProfessionals} />
          </div>
        </div>
      </div>

      <div className="row form-group">
        <div className="col-sm-1 col-lg-1 mr-1">
          <label className="text-muted">Staff:</label>
        </div>
        <div className="col-sm-7 col-lg-4">
          <FormRadio changeHandler={inputChange("staff")} inputId="staffVolunteer" inputValue="staff" inputLabel="Volunteer" checkedValue={values.staff} />
          <FormRadio changeHandler={inputChange("staff")} inputId="staffCommunityAssistant" inputValue="staff" inputLabel="Community Assistant" checkedValue={values.staff} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Neighbourhood Net:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhoodNet")} inputId="neighbourhoodNet" inputValue="neighbourhoodNet" inputLabel="Citizenship" />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhoodIncomeTax")} inputId="neighbourhoodIncomeTax" inputValue="neighbourhoodIncomeTax" inputLabel="IncomeTax" />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhoodOther")} inputId="neighbourhoodOther" inputValue="neighbourhoodOther" inputLabel="Other" />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="othersTextArea" className="text-muted">
          Others, if any
        </label>
        <textarea className="form-control col col-md-6" id="othersTextArea" rows="2" col="10" placeholder="Your interests" onChange={inputChange("othersTextArea")}>
          {values.othersTextArea}
        </textarea>
      </div>
      <div className="form-group">
        <label htmlFor="agentNotesTextArea" className="text-muted">
          Agent Notes
        </label>
        <textarea className="form-control col col-md-10" id="agentNotesTextArea" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("agentNotesTextArea")}>
          {values.agentNotesTextArea}
        </textarea>
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
