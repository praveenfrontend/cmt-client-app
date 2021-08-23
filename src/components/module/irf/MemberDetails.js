/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import FormInput from "../../FormFields/FormInput";
import { CSSTransition } from "react-transition-group";

function MemberDetails({ values, inputChange, nextStep, prevStep }) {
  const [continueCount, setContinueCount] = useState(0);

  const initialState = {
    myHealth: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myLifeSatisfaction: {
      value: "",
      hasErrors: false,
      message: ""
    },
    mySocialNetwork: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myCommunityNetwork: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myStressLevel: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myHealthIssues: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myFamilyDoctor: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myVisitToFamilyDoctor: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myVisitToClinic: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myVisitToEmergency: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myVisitToHospital: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myDiseaseAwareness: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myCmtProgramAwareness: {
      value: "",
      hasErrors: false,
      message: ""
    },
    myPhysicalActiveness: {
      value: "",
      hasErrors: false,
      message: ""
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "myHealthImmediately":
        draft.myHealth.hasErrors = false;
        draft.myHealth.value = action.value;
        if (draft.myHealth.value === values.myHealth) {
          draft.myHealth.hasErrors = true;
          draft.myHealth.message = "Select my health.";
        }
        return;
      case "myLifeSatisfactionImmediately":
        draft.myLifeSatisfaction.hasErrors = false;
        draft.myLifeSatisfaction.value = action.value;
        if (draft.myLifeSatisfaction.value === values.myLifeSatisfaction) {
          draft.myLifeSatisfaction.hasErrors = true;
          draft.myLifeSatisfaction.message = "Select my satisfaction.";
        }
        return;
      case "mySocialNetworkImmediately":
        draft.mySocialNetwork.hasErrors = false;
        draft.mySocialNetwork.value = action.value;
        if (draft.mySocialNetwork.value === values.mySocialNetwork) {
          draft.mySocialNetwork.hasErrors = true;
          draft.mySocialNetwork.message = "Select my social network.";
        }
        return;
      case "myCommunityNetworkImmediately":
        draft.myCommunityNetwork.hasErrors = false;
        draft.myCommunityNetwork.value = action.value;
        if (draft.myCommunityNetwork.value === values.myCommunityNetwork) {
          draft.myCommunityNetwork.hasErrors = true;
          draft.myCommunityNetwork.message = "Select my level of connection.";
        }
        return;
      case "myStressLevelImmediately":
        draft.myStressLevel.hasErrors = false;
        draft.myStressLevel.value = action.value;
        if (draft.myStressLevel.value === values.myStressLevel) {
          draft.myStressLevel.hasErrors = true;
          draft.myStressLevel.message = "Select my stress level.";
        }
        return;
      case "myHealthIssuesImmediately":
        draft.myHealthIssues.hasErrors = false;
        draft.myHealthIssues.value = action.value;
        if (draft.myHealthIssues.value === values.myHealthIssues) {
          draft.myHealthIssues.hasErrors = true;
          draft.myHealthIssues.message = "Select my personal health.";
        }
        return;
      case "myFamilyDoctorImmediately":
        draft.myFamilyDoctor.hasErrors = false;
        draft.myFamilyDoctor.value = action.value;
        if (draft.myFamilyDoctor.value === values.myFamilyDoctor) {
          draft.myFamilyDoctor.hasErrors = true;
          draft.myFamilyDoctor.message = "Select my family doctor.";
        }
        return;
      case "myDiseaseAwarenessImmediately":
        draft.myDiseaseAwareness.hasErrors = false;
        draft.myDiseaseAwareness.value = action.value;
        if (draft.myDiseaseAwareness.value === values.myDiseaseAwareness) {
          draft.myDiseaseAwareness.hasErrors = true;
          draft.myDiseaseAwareness.message = "Select my disease awareness.";
        }
        return;
      case "myCmtProgramAwarenessImmediately":
        draft.myCmtProgramAwareness.hasErrors = false;
        draft.myCmtProgramAwareness.value = action.value;
        if (draft.myCmtProgramAwareness.value === values.myCmtProgramAwareness) {
          draft.myCmtProgramAwareness.hasErrors = true;
          draft.myCmtProgramAwareness.message = "Select my program awareness.";
        }
        return;
      case "myPhysicalActivenessImmediately":
        draft.myPhysicalActiveness.hasErrors = false;
        draft.myPhysicalActiveness.value = action.value;
        if (draft.myPhysicalActiveness.value === values.myPhysicalActiveness) {
          draft.myPhysicalActiveness.hasErrors = true;
          draft.myPhysicalActiveness.message = "Select my physical activeness.";
        }
        return;

      case "myVisitToFamilyDoctorImmediately":
        draft.myVisitToFamilyDoctor.hasErrors = false;
        draft.myVisitToFamilyDoctor.value = action.value;
        if (values.myVisitToFamilyDoctor.length === 0) {
          draft.myVisitToFamilyDoctor.hasErrors = true;
          draft.myVisitToFamilyDoctor.message = "Doctor visit cannot be empty.";
          return;
        }
        if (values.myVisitToFamilyDoctor > 365) {
          draft.myVisitToFamilyDoctor.hasErrors = true;
          draft.myVisitToFamilyDoctor.message = "Please enter number less than 365";
          return;
        }
        if (!/^\d+?$/.test(values.myVisitToFamilyDoctor)) {
          draft.myVisitToFamilyDoctor.hasErrors = true;
          draft.myVisitToFamilyDoctor.message = "Enter only positive number.";
          return;
        }
        return;
      case "myVisitToClinicImmediately":
        draft.myVisitToClinic.hasErrors = false;
        draft.myVisitToClinic.value = action.value;
        if (values.myVisitToClinic.length === 0) {
          draft.myVisitToClinic.hasErrors = true;
          draft.myVisitToClinic.message = "Clinic visit cannot be empty.";
          return;
        }
        if (values.myVisitToClinic > 365) {
          draft.myVisitToClinic.hasErrors = true;
          draft.myVisitToClinic.message = "Please enter number less than 365";
          return;
        }
        if (!/^\d+?$/.test(values.myVisitToClinic)) {
          draft.myVisitToClinic.hasErrors = true;
          draft.myVisitToClinic.message = "Enter only positive number.";
          return;
        }
        return;
      case "myVisitToEmergencyImmediately":
        draft.myVisitToEmergency.hasErrors = false;
        draft.myVisitToEmergency.value = action.value;
        if (values.myVisitToEmergency.length === 0) {
          draft.myVisitToEmergency.hasErrors = true;
          draft.myVisitToEmergency.message = "Emergency visit cannot be empty.";
          return;
        }
        if (values.myVisitToEmergency > 365) {
          draft.myVisitToEmergency.hasErrors = true;
          draft.myVisitToEmergency.message = "Please enter number less than 365";
          return;
        }
        if (!/^\d+?$/.test(values.myVisitToEmergency)) {
          draft.myVisitToEmergency.hasErrors = true;
          draft.myVisitToEmergency.message = "Enter only positive number.";
          return;
        }
        return;
      case "myVisitToHospitalImmediately":
        draft.myVisitToHospital.hasErrors = false;
        draft.myVisitToHospital.value = action.value;
        if (values.myVisitToHospital.length === 0) {
          draft.myVisitToHospital.hasErrors = true;
          draft.myVisitToHospital.message = "Hospital visit cannot be empty.";
          return;
        }
        if (values.myVisitToHospital > 365) {
          draft.myVisitToHospital.hasErrors = true;
          draft.myVisitToHospital.message = "Please enter number less than 365";
          return;
        }
        if (!/^\d+?$/.test(values.myVisitToHospital)) {
          draft.myVisitToHospital.hasErrors = true;
          draft.myVisitToHospital.message = "Enter only positive number.";
          return;
        }
        return;

      case "submitForm":
        if (!draft.myHealth.hasErrors && !draft.myLifeSatisfaction.hasErrors && !draft.mySocialNetwork.hasErrors && !draft.myCommunityNetwork.hasErrors && !draft.myStressLevel.hasErrors && !draft.myHealthIssues.hasErrors && !draft.myFamilyDoctor.hasErrors && !draft.myDiseaseAwareness.hasErrors && !draft.myCmtProgramAwareness.hasErrors && !draft.myPhysicalActiveness.hasErrors && !draft.myVisitToFamilyDoctor.hasErrors && !draft.myVisitToClinic.hasErrors && !draft.myVisitToEmergency.hasErrors && !draft.myVisitToHospital.hasErrors) {
          setContinueCount(1);
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (continueCount) {
      nextStep();
    }
  }, [continueCount, nextStep]);

  function nextHandler(e) {
    e.preventDefault();

    dispatch({ type: "myHealthImmediately", value: state.myHealth.value });
    dispatch({ type: "myLifeSatisfactionImmediately", value: state.myLifeSatisfaction.value });
    dispatch({ type: "mySocialNetworkImmediately", value: state.mySocialNetwork.value });
    dispatch({ type: "myCommunityNetworkImmediately", value: state.myCommunityNetwork.value });
    dispatch({ type: "myStressLevelImmediately", value: state.myStressLevel.value });
    dispatch({ type: "myHealthIssuesImmediately", value: state.myHealthIssues.value });
    dispatch({ type: "myFamilyDoctorImmediately", value: state.myFamilyDoctor.value });
    dispatch({ type: "myDiseaseAwarenessImmediately", value: state.myDiseaseAwareness.value });
    dispatch({ type: "myCmtProgramAwarenessImmediately", value: state.myCmtProgramAwareness.value });
    dispatch({ type: "myPhysicalActivenessImmediately", value: state.myPhysicalActiveness.value });
    dispatch({ type: "myVisitToFamilyDoctorImmediately", value: state.myVisitToFamilyDoctor.value });
    dispatch({ type: "myVisitToClinicImmediately", value: state.myVisitToFamilyDoctor.value });
    dispatch({ type: "myVisitToEmergencyImmediately", value: state.myVisitToFamilyDoctor.value });
    dispatch({ type: "myVisitToHospitalImmediately", value: state.myVisitToFamilyDoctor.value });

    dispatch({ type: "submitForm" });
  }

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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputHandler={e => dispatch({ type: "myHealthImmediately", value: e.target.id })} inputId="myHealth_poor" inputName="myHealth" inputValue="Poor" inputLabel="Poor" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputHandler={e => dispatch({ type: "myHealthImmediately", value: e.target.id })} inputId="myHealth_fair" inputName="myHealth" inputValue="Fair" inputLabel="Fair" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputHandler={e => dispatch({ type: "myHealthImmediately", value: e.target.id })} inputId="myHealth_good" inputName="myHealth" inputValue="Good" inputLabel="Good" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputHandler={e => dispatch({ type: "myHealthImmediately", value: e.target.id })} inputId="myHealth_very_good" inputName="myHealth" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myHealth} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealth")} inputHandler={e => dispatch({ type: "myHealthImmediately", value: e.target.id })} inputId="myHealth_excellent" inputName="myHealth" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myHealth} />
          </div>
        </div>
        <CSSTransition in={state.myHealth.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myHealth.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My satisfaction with my life is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputHandler={e => dispatch({ type: "myLifeSatisfactionImmediately", value: e.target.id })} inputId="myLifeSatisfaction_poor" inputName="myLifeSatisfaction" inputValue="Poor" inputLabel="Poor" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputHandler={e => dispatch({ type: "myLifeSatisfactionImmediately", value: e.target.id })} inputId="myLifeSatisfaction_fair" inputName="myLifeSatisfaction" inputValue="Fair" inputLabel="Fair" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputHandler={e => dispatch({ type: "myLifeSatisfactionImmediately", value: e.target.id })} inputId="myLifeSatisfaction_good" inputName="myLifeSatisfaction" inputValue="Good" inputLabel="Good" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputHandler={e => dispatch({ type: "myLifeSatisfactionImmediately", value: e.target.id })} inputId="myLifeSatisfaction_very_good" inputName="myLifeSatisfaction" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myLifeSatisfaction} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myLifeSatisfaction")} inputHandler={e => dispatch({ type: "myLifeSatisfactionImmediately", value: e.target.id })} inputId="myLifeSatisfaction_excellent" inputName="myLifeSatisfaction" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myLifeSatisfaction} />
          </div>
        </div>
        <CSSTransition in={state.myLifeSatisfaction.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myLifeSatisfaction.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My social networks of family and friends are:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputHandler={e => dispatch({ type: "mySocialNetworkImmediately", value: e.target.id })} inputId="mySocialNetwork_poor" inputName="mySocialNetwork" inputValue="Poor" inputLabel="Poor" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputHandler={e => dispatch({ type: "mySocialNetworkImmediately", value: e.target.id })} inputId="mySocialNetwork_fair" inputName="mySocialNetwork" inputValue="Fair" inputLabel="Fair" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputHandler={e => dispatch({ type: "mySocialNetworkImmediately", value: e.target.id })} inputId="mySocialNetwork_good" inputName="mySocialNetwork" inputValue="Good" inputLabel="Good" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputHandler={e => dispatch({ type: "mySocialNetworkImmediately", value: e.target.id })} inputId="mySocialNetwork_very_good" inputName="mySocialNetwork" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.mySocialNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("mySocialNetwork")} inputHandler={e => dispatch({ type: "mySocialNetworkImmediately", value: e.target.id })} inputId="mySocialNetwork_excellent" inputName="mySocialNetwork" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.mySocialNetwork} />
          </div>
        </div>
        <CSSTransition in={state.mySocialNetwork.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.mySocialNetwork.message}</div>
        </CSSTransition>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My level of connection with my community is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputHandler={e => dispatch({ type: "myCommunityNetworkImmediately", value: e.target.id })} inputId="myCommunityNetwork_poor" inputName="myCommunityNetwork" inputValue="Poor" inputLabel="Poor" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputHandler={e => dispatch({ type: "myCommunityNetworkImmediately", value: e.target.id })} inputId="myCommunityNetwork_fair" inputName="myCommunityNetwork" inputValue="Fair" inputLabel="Fair" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputHandler={e => dispatch({ type: "myCommunityNetworkImmediately", value: e.target.id })} inputId="myCommunityNetwork_good" inputName="myCommunityNetwork" inputValue="Good" inputLabel="Good" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputHandler={e => dispatch({ type: "myCommunityNetworkImmediately", value: e.target.id })} inputId="myCommunityNetwork_very_good" inputName="myCommunityNetwork" inputValue="Very Good" inputLabel="Very Good" checkedValue={values.myCommunityNetwork} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCommunityNetwork")} inputHandler={e => dispatch({ type: "myCommunityNetworkImmediately", value: e.target.id })} inputId="myCommunityNetwork_excellent" inputName="myCommunityNetwork" inputValue="Excellent" inputLabel="Excellent" checkedValue={values.myCommunityNetwork} />
          </div>
        </div>
        <CSSTransition in={state.myCommunityNetwork.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myCommunityNetwork.message}</div>
        </CSSTransition>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">My level of stress is:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputHandler={e => dispatch({ type: "myStressLevelImmediately", value: e.target.id })} inputId="myStressLevel_high" inputName="myStressLevel" inputValue="High" inputLabel="High" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputHandler={e => dispatch({ type: "myStressLevelImmediately", value: e.target.id })} inputId="myStressLevel_lot" inputName="myStressLevel" inputValue="Quite a lot" inputLabel="Quite a lot" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputHandler={e => dispatch({ type: "myStressLevelImmediately", value: e.target.id })} inputId="myStressLevel_depends" inputName="myStressLevel" inputValue="Depends" inputLabel="Depends" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputHandler={e => dispatch({ type: "myStressLevelImmediately", value: e.target.id })} inputId="myStressLevel_manageable" inputName="myStressLevel" inputValue="Manageable" inputLabel="Manageable" checkedValue={values.myStressLevel} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myStressLevel")} inputHandler={e => dispatch({ type: "myStressLevelImmediately", value: e.target.id })} inputId="myStressLevel_low" inputName="myStressLevel" inputValue="Low" inputLabel="Low" checkedValue={values.myStressLevel} />
          </div>
        </div>
        <CSSTransition in={state.myStressLevel.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myStressLevel.message}</div>
        </CSSTransition>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I can talk to others about my personal health issues:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputHandler={e => dispatch({ type: "myHealthIssuesImmediately", value: e.target.id })} inputId="myHealthIssues_never" inputName="myHealthIssues" inputValue="Never" inputLabel="Never" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputHandler={e => dispatch({ type: "myHealthIssuesImmediately", value: e.target.id })} inputId="myHealthIssues_urgent" inputName="myHealthIssues" inputValue="When it is urgent" inputLabel="When it is urgent" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputHandler={e => dispatch({ type: "myHealthIssuesImmediately", value: e.target.id })} inputId="myHealthIssues_upset" inputName="myHealthIssues" inputValue="If I am upset" inputLabel="If I am upset" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputHandler={e => dispatch({ type: "myHealthIssuesImmediately", value: e.target.id })} inputId="myHealthIssues_sometimes" inputName="myHealthIssues" inputValue="Sometimes" inputLabel="Sometimes" checkedValue={values.myHealthIssues} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myHealthIssues")} inputHandler={e => dispatch({ type: "myHealthIssuesImmediately", value: e.target.id })} inputId="myHealthIssues_all_time" inputName="myHealthIssues" inputValue="All the time" inputLabel="All the time" checkedValue={values.myHealthIssues} />
          </div>
        </div>
        <CSSTransition in={state.myHealthIssues.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myHealthIssues.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">Do you have a family doctor?</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myFamilyDoctor")} inputHandler={e => dispatch({ type: "myFamilyDoctorImmediately", value: e.target.id })} inputId="myFamilyDoctor_yes" inputName="myFamilyDoctor" inputValue="Yes" inputLabel="Yes" checkedValue={values.myFamilyDoctor} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myFamilyDoctor")} inputHandler={e => dispatch({ type: "myFamilyDoctorImmediately", value: e.target.id })} inputId="myFamilyDoctor_no" inputName="myFamilyDoctor" inputValue="No" inputLabel="No" checkedValue={values.myFamilyDoctor} />
          </div>
        </div>
        <CSSTransition in={state.myFamilyDoctor.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myFamilyDoctor.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">Number of times each year I visit:</label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Family Doctor" changeHandler={inputChange("myVisitToFamilyDoctor")} inputHandler={e => dispatch({ type: "myVisitToFamilyDoctorImmediately", value: e.target.value })} message={state.myVisitToFamilyDoctor.message} inputField={state.myVisitToFamilyDoctor.hasErrors} value={values.myVisitToFamilyDoctor} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Walk in Clinic" changeHandler={inputChange("myVisitToClinic")} inputHandler={e => dispatch({ type: "myVisitToClinicImmediately", value: e.target.value })} message={state.myVisitToClinic.message} inputField={state.myVisitToClinic.hasErrors} value={values.myVisitToClinic} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Emergency Room" changeHandler={inputChange("myVisitToEmergency")} inputHandler={e => dispatch({ type: "myVisitToEmergencyImmediately", value: e.target.value })} message={state.myVisitToEmergency.message} inputField={state.myVisitToEmergency.hasErrors} value={values.myVisitToEmergency} />
          </div>
          <div className="col-sm-6 col-lg-3">
            <FormInput icon="fas fa-hospital" type="number" placeholder="Hospital" changeHandler={inputChange("myVisitToHospital")} inputHandler={e => dispatch({ type: "myVisitToHospitalImmediately", value: e.target.value })} message={state.myVisitToHospital.message} inputField={state.myVisitToHospital.hasErrors} value={values.myVisitToHospital} />
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
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myDiseaseAwareness")} inputHandler={e => dispatch({ type: "myDiseaseAwarenessImmediately", value: e.target.id })} inputId="myDiseaseAwareness_yes" inputName="myDiseaseAwareness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myDiseaseAwareness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myDiseaseAwareness")} inputHandler={e => dispatch({ type: "myDiseaseAwarenessImmediately", value: e.target.id })} inputId="myDiseaseAwareness_no" inputName="myDiseaseAwareness" inputValue="No" inputLabel="No" checkedValue={values.myDiseaseAwareness} />
          </div>
        </div>
        <CSSTransition in={state.myDiseaseAwareness.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myDiseaseAwareness.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I am aware of facilities, programs, parks, playgrounds within community for healthy living and physical activity:</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCmtProgramAwareness")} inputHandler={e => dispatch({ type: "myCmtProgramAwarenessImmediately", value: e.target.id })} inputId="myCmtProgramAwareness_yes" inputName="myCmtProgramAwareness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myCmtProgramAwareness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myCmtProgramAwareness")} inputHandler={e => dispatch({ type: "myCmtProgramAwarenessImmediately", value: e.target.id })} inputId="myCmtProgramAwareness_no" inputName="myCmtProgramAwareness" inputValue="No" inputLabel="No" checkedValue={values.myCmtProgramAwareness} />
          </div>
        </div>
        <CSSTransition in={state.myCmtProgramAwareness.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myCmtProgramAwareness.message}</div>
        </CSSTransition>
      </div>

      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="text-muted mr-2">I am physically active (exercise atleast 3 times a week for 1 hour):</label>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myPhysicalActiveness")} inputHandler={e => dispatch({ type: "myPhysicalActivenessImmediately", value: e.target.id })} inputId="myPhysicalActiveness_yes" inputName="myPhysicalActiveness" inputValue="Yes" inputLabel="Yes" checkedValue={values.myPhysicalActiveness} />
            <FormRadio classNameValue="col-md-2 col-lg-2 col-xl-2" changeHandler={inputChange("myPhysicalActiveness")} inputHandler={e => dispatch({ type: "myPhysicalActivenessImmediately", value: e.target.id })} inputId="myPhysicalActiveness_no" inputName="myPhysicalActiveness" inputValue="No" inputLabel="No" checkedValue={values.myPhysicalActiveness} />
          </div>
        </div>
        <CSSTransition in={state.myPhysicalActiveness.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.myPhysicalActiveness.message}</div>
        </CSSTransition>
      </div>

      <br />
      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-danger" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-primary" onClick={nextHandler}>
            Continue
          </button>
        </div>
      </div>
    </Page>
  );
}

export default MemberDetails;
