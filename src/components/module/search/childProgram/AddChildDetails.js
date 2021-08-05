/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Link } from "react-router-dom";
import Axios from "axios";

import FormInput from "../../../FormFields/FormInput";
import FormRadio from "../../../FormFields/FormRadio";
import FormCheckbox from "../../../FormFields/FormCheckbox";
import { CSSTransition } from "react-transition-group";
import swal from "sweetalert";
import Container from "../../../common/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddChildDetails({ values, inputChange, addChild, removeChild, handleChangeChildProgram, inputChangeChildProgram, inputChangeDate, loadingHandler, responseHandler }) {

    const [submitCount, setSubmitCount] = useState(0);
    const [selectedBirthDate, setSelectedBirthDate] = useState("");
    

    const initialState = {
        childProgram: {
            value: "",
            hasErrors: false,
            message: ""
        },
        firstName: {
            value: "",
            hasErrors: false,
            message: ""
        },
        lastName: {
            value: "",
            hasErrors: false,
            message: ""
        },
        birthDate: {
            value: "",
            hasErrors: false,
            message: ""
        }
    };

    function ourReducer(draft, action) {
        switch (action.type) {
            case "childProgramImmediately":
                draft.childProgram.hasErrors = false;
                draft.childProgram.value = action.value;
                if (draft.childProgram.value === values.childProgram) {
                    draft.childProgram.hasErrors = true;
                    draft.childProgram.message = "Select Child Program.";
                }
                return;
            case "firstNameImmediately":
                draft.firstName.hasErrors = false;
                draft.firstName.value = action.value;
                if (/\d/.test(values.firstName)) {
                    draft.firstName.hasErrors = true;
                    draft.firstName.message = "Enter first name without numbers.";
                    return;
                }
                if (!/^[a-zA-Z]+$/.test(values.firstName)) {
                    draft.firstName.hasErrors = true;
                    draft.firstName.message = "First name cannot be empty.";
                    return;
                }
                return;
            case "lastNameImmediately":
                draft.lastName.hasErrors = false;
                draft.lastName.value = action.value;
                if (/\d/.test(values.lastName)) {
                    draft.lastName.hasErrors = true;
                    draft.lastName.message = "Enter last name without numbers.";
                    return;
                }
                if (!/^[a-zA-Z]+$/.test(values.lastName)) {
                    draft.lastName.hasErrors = true;
                    draft.lastName.message = "Last name cannot be empty.";
                    return;
                }
                return;
            case "birthDateImmediately":
                draft.birthDate.hasErrors = false;
                draft.birthDate.value = action.value;
                if (draft.birthDate.value.length === 0) {
                draft.birthDate.hasErrors = true;
                draft.birthDate.message = "Birth Date cannot be empty.";
                return;
                }
                // inputChangeDate("StartDate", draft.startDate.value)
                return;
            
    
            case "submitForm":
                if (!draft.firstName.hasErrors && !draft.lastName.hasErrors && !draft.birthDate.hasErrors ) {
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
              const response = await Axios.post(
                "/irf_childAdd",
                {
                  userId: values.userId,
                  child_program: values.child_program
                }
              );
  
              if (response.data.success === true) {
                loadingHandler(false)
                responseHandler(true)
              }
            } catch (e) {
              swal("Please update all fields.", e.response.data, "error");
              loadingHandler(false)
            }
          }
          fetchResults();
          setSubmitCount(0);
        }
      }, [dispatch, loadingHandler, responseHandler, submitCount, values.userId, values.child_program ]);
  
      async function handleSubmit(e) {
        e.preventDefault();
    
        // dispatch({ type: "locationImmediately", value: state.location.value });
        // dispatch({ type: "instructorImmediately", value: state.instructor.value });
        // dispatch({ type: "startDateImmediately", value: state.startDate.value });
        // dispatch({ type: "endDateImmediately", value: state.endDate.value });
        // dispatch({ type: "statusImmediately", value: state.status.value });
        // dispatch({ type: "ratingBeforeImmediately", value: state.ratingBefore.value });
        // dispatch({ type: "submitForm" });
      }

    return (
        <>
            <Container title="Child Details">
                <div className="row form-group">
                <div className="col-md-7 col-lg-6">
                    <label className="text-muted mr-2">Information if Registration for a Child's program</label>
                </div>
                <div className="col-md-3 col-lg-6">
                    {/* <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("ChildValue")} inputId="childYes" inputName="ChildValue" inputValue="Yes" inputLabel="Yes" checkedValue={values.ChildValue} /> */}
                    {/* <FormRadio classNameValue="" changeHandler={this.inputChangeChildProgram("ChildValue")} inputId="childNo" inputName="ChildValue" inputValue="No" inputLabel="No" checkedValue={values.ChildValue} /> */}

                    <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("ChildValue")} inputHandler={e => dispatch({ type: "childProgramImmediately", value: e.target.id })} inputId="childYes" inputName="ChildValue" inputValue="Yes" inputLabel="Yes" checkedValue={values.ChildValue} />
                    <FormRadio classNameValue="" changeHandler={inputChangeChildProgram("ChildValue")} inputHandler={e => dispatch({ type: "childProgramImmediately", value: e.target.id })} inputId="childNo" inputName="ChildValue" inputValue="No" inputLabel="No" checkedValue={values.ChildValue} />
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

                {values.childProgramAddRemove && values.child_program.length ? (
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
                        {values.child_program.map((item, idx) => (
                            <tr id="addr0" key={idx}>
                            <td>{
                                // <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={this.handleChangeChildProgram(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={values.child_program[idx].isChecked} />
                                <FormCheckbox classNameValue="col col-sm-4 col-md-3 col-lg-2" changeHandler={handleChangeChildProgram(idx)} inputId={idx} inputValue={"child_program" + idx} checkedValue={values.child_program[idx].isChecked} />
                            }
                            </td>
                            <td>
                                {/* <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childFirstName} name="childFirstName" /> */}
                                <FormInput icon="fas fa-child" type="text" placeholder="Child First Name" changeHandler={handleChangeChildProgram(idx)} inputHandler={e => dispatch({ type: "firstNameImmediately", value: e.target.value })} message={state.firstName.message} inputField={state.firstName.hasErrors} value={values.child_program[idx].childFirstName} name="childFirstName" />
                            </td>
                            <td>
                                {/* <FormInput icon="fas fa-child" type="text" placeholder="Child Last Name" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childLastName} name="childLastName" /> */}
                            </td>
                            <td>
                                {/* <FormInput icon="fas fa-calendar" type="text" placeholder="DD/MM/YYYY" changeHandler={this.handleChangeChildProgram(idx)} value={values.child_program[idx].childBirthDate} name="childBirthDate" /> */}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                ) : null}
            </Container>

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
    )
}

export default AddChildDetails;