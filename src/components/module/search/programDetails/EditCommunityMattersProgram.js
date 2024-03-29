/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import { Link } from "react-router-dom";
import Axios from "axios";
import Page from "../../../common/Page";
import FormRadio from "../../../FormFields/FormRadio";
import FormCheckbox from "../../../FormFields/FormCheckbox";
import swal from "sweetalert";

import { CSSTransition } from "react-transition-group";

function EditCommunityMattersProgram({ values, inputChange, inputCheckBoxHandler, loadingHandler, responseHandler /* , checkedValueHandler */ }) {

  const [submitCount, setSubmitCount] = useState(0);

  const initialState = {
    after_school_program: {
      value: "",
      hasErrors: false,
      message: ""
    },
    Others: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };


  function ourReducer(draft, action) {
    switch (action.type) {
      case "afterSchoolImmediately":
        draft.after_school_program.hasErrors = false;
        draft.after_school_program.value = action.value;
        if (draft.after_school_program.value === values.after_school_program) {
          draft.after_school_program.hasErrors = true;
          draft.after_school_program.message = "Select after school program.";
        }
        return;

      case "OthersImmediately":
        draft.Others.hasErrors = false;
        draft.Others.value = action.value;
        if (values.Others.length === 0) {
          draft.Others.hasErrors = true;
          draft.Others.message = "Others, if any cannot be empty.";
          return;
        }
        return;


      case "submitForm":
        if (!draft.after_school_program.hasErrors && !draft.Others.hasErrors ) {
          setSubmitCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);


  useEffect(() => {
    if (submitCount) {
      async function fetchResults() {
        loadingHandler(true)
        try {

          const userprograms = {
            health : values.health,
            employment: values.employment,
            neighbourhood_net: values.neighbourhood_net,
            staff: values.staff
          };


          const response = await Axios.post(
            "/irf_programUpdate",
            {
              userId: values.userId,
              after_school_program: values.after_school_program,
              userprograms: userprograms,
              Others: values.Others
            }
          );

          if (response.data.success === true) {
            loadingHandler(false)
            responseHandler(true)
          }
        } catch (e) {
          swal("Something went wrong.", e.response.data, "error");
          loadingHandler(false)
        }
      }
      fetchResults();
      setSubmitCount(0);
    }
  }, [dispatch, loadingHandler, responseHandler, submitCount, values.userId, values.after_school_program, values.health, values.employment, values.neighbourhood_net, values.staff, values.Others]);



  async function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "afterSchoolImmediately", value: state.after_school_program.value });
    dispatch({ type: "OthersImmediately", value: state.Others.value });
    dispatch({ type: "submitForm" });
  }






  return (
    <>
    <Page title="Community Matters Program">
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
          {/* <FormRadio changeHandler={inputChange("after_school_program")} inputId="after_school_program_yes" inputName="after_school_program" inputValue="Yes" inputLabel="Yes" checkedValue={values.after_school_program} />
          <FormRadio changeHandler={inputChange("after_school_program")} inputId="after_school_program_no" inputName="after_school_program" inputValue="No" inputLabel="No" checkedValue={values.after_school_program} /> */}
          <FormRadio changeHandler={inputChange("after_school_program")} inputHandler={e => dispatch({ type: "afterSchoolImmediately", value: e.target.id })} inputId="after_school_program_yes" inputName="after_school_program" inputValue="Yes" inputLabel="Yes" checkedValue={values.after_school_program} />
          <FormRadio changeHandler={inputChange("after_school_program")} inputHandler={e => dispatch({ type: "afterSchoolImmediately", value: e.target.id })} inputId="after_school_program_no" inputName="after_school_program" inputValue="No" inputLabel="No" checkedValue={values.after_school_program} />
        </div>
        <CSSTransition in={state.after_school_program.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.after_school_program.message}</div>
        </CSSTransition>
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
          <FormCheckbox /* classNameValue="col col-sm-3" */ changeHandler={inputCheckBoxHandler("staff")} inputId="staffVolunteer" inputValue="staffVolunteer" inputLabel="Volunteer" checkedValue={values.staff.staffVolunteer.isChecked} />
          <FormCheckbox /* classNameValue="col col-sm-3" */ changeHandler={inputCheckBoxHandler("staff")} inputId="staffCommunityAssistant" inputValue="staffCommunityAssistant" inputLabel="Community Assistant" checkedValue={values.staff.staffCommunityAssistant.isChecked} />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <div className="col">
            <label className="text-muted mr-2">Neighbourhood Net:</label>
          </div>
          <div className="col">
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood_net")} inputId="neighbourhoodCitizenship" inputValue="neighbourhoodCitizenship" inputLabel="Citizenship" checkedValue={values.neighbourhood_net.neighbourhoodCitizenship.isChecked} />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood_net")} inputId="neighbourhoodIncomeTax" inputValue="neighbourhoodIncomeTax" inputLabel="IncomeTax" checkedValue={values.neighbourhood_net.neighbourhoodIncomeTax.isChecked} />
            <FormCheckbox classNameValue="col col-sm-3" changeHandler={inputCheckBoxHandler("neighbourhood_net")} inputId="neighbourhoodOther" inputValue="neighbourhoodOther" inputLabel="Other" checkedValue={values.neighbourhood_net.neighbourhoodOther.isChecked} />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="othersTextArea" className="text-muted">
          Others, if any
        </label>
        {/* <textarea className="form-control col col-md-6" id="Others" rows="2" col="10" placeholder="Your interests" onChange={inputChange("Others")} value={values.Others}></textarea> */}
        <textarea className="form-control col col-md-6" id="Others" rows="2" col="10" placeholder="Your interests" onChange={inputChange("Others")} onInput={e => dispatch({ type: "OthersImmediately", value: e.target.value })} message={state.Others.message} inputField={state.Others.hasErrors} value={values.Others}></textarea>
        <CSSTransition in={state.Others.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.Others.message}</div>
        </CSSTransition>
      </div>
    </Page>

    <div className="row justify-content-center">
      <div className="col col-sm-4 col-md-3 col-lg-2">
        <Link to="/" onClick={handleSubmit}>
          <button className="btn btn-block btn-success">Submit</button>
        </Link>
      </div>
      <div className="col col-sm-4 col-md-3 col-lg-2">
        <Link to="/search">
          <button className="btn btn-block btn-danger">Back</button>
        </Link>
      </div>
    </div>

    </>
  );
}

export default EditCommunityMattersProgram;
