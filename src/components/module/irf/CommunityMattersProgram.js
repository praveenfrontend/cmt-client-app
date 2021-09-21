/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import Page from "../../common/Page";
import FormRadio from "../../FormFields/FormRadio";
import FormCheckbox from "../../FormFields/FormCheckbox";
import { CSSTransition } from "react-transition-group";

function CommunityMattersProgram({ values, inputChange, inputCheckBoxHandler, nextStep, prevStep }) {
  const [continueCount, setContinueCount] = useState(0);

  const initialState = {
    after_school_program: {
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

      case "submitForm":
        if (!draft.after_school_program.hasErrors ) {
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

    dispatch({ type: "afterSchoolImmediately", value: state.after_school_program.value });
    dispatch({ type: "submitForm" });
  }

  return (
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
          <FormRadio changeHandler={inputChange("after_school_program")} inputHandler={e => dispatch({ type: "afterSchoolImmediately", value: e.target.id })} inputId="after_school_program_yes" inputName="after_school_program" inputValue="Yes" inputLabel="Yes" checkedValue={values.after_school_program} />
          <FormRadio changeHandler={inputChange("after_school_program")} inputHandler={e => dispatch({ type: "afterSchoolImmediately", value: e.target.id })} inputId="after_school_program_no" inputName="after_school_program" inputValue="No" inputLabel="No" checkedValue={values.after_school_program} />
        </div>
        <CSSTransition in={state.after_school_program.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
          <div className="alert alert-danger small liveValidateMessage">{state.after_school_program.message}</div>
        </CSSTransition>
      </div>

      {
        Object.entries(values.userprograms).map(([programName,programs]) => {
          return (
            <div className="row">
              <div className="form-group">
                <div className="col">
                  <label className="text-muted mr-2">{programName}</label>
                </div>
                <div className="col">
                  {
                    Object.entries(programs).map(([key, value]) => {
                      return <FormCheckbox 
                        classNameValue="col col-sm-4 col-md-3 col-lg-2" 
                        inputId={key}
                        inputValue={key}
                        inputLabel={value.value}
                        changeHandler={inputCheckBoxHandler(programName)} 
                        checkedValue={value.isChecked} 
                      />
                    })
                  }
                </div>
              </div>
            </div> 
          )
        })
      }

      <div className="form-group">
        <label htmlFor="othersTextArea" className="text-muted">
          Others, if any
        </label>
        <textarea className="form-control col col-md-6" id="Others" rows="2" col="10" placeholder="Your interests" onChange={inputChange("Others")}  ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="notes" className="text-muted">
          Agent Notes
        </label>
        <textarea className="form-control col col-md-10" id="notes" rows="4" placeholder="Reminder Notes upto 1000 characters allowed" maxLength="1000" onChange={inputChange("notes")} ></textarea>
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

export default CommunityMattersProgram;
