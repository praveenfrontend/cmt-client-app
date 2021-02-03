import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";

import FormInput from "../../../FormFields/FormInput";
import Page from "../../../common/Page";
import FormRadio from "../../../FormFields/FormRadio";
import EditCommunityMattersProgram from "./EditCommunityMattersProgram";

class EditProgramDetails extends Component {
  state = {
    loading: false,
    registrationId: this.props.registrationId,
    program_details: this.props.programDetails,

    after_school_program: "",

    health: {
      healthZumba: { isChecked: false, value: "Zumba" },
      healthYoga: { isChecked: false, value: "Yoga" },
      healthDental: { isChecked: false, value: "Dental" },
      healthKarate: { isChecked: false, value: "Karate" },
      healthMeditation: { isChecked: false, value: "Meditation" },
      healthFoodMarket: { isChecked: false, value: "Food Market" },
      healthBellyDancing: { isChecked: false, value: "Belly Dancing" },
      healthAdultPlus: { isChecked: false, value: "Adult Plus" },
      healthEnglishCafe: { isChecked: false, value: "English Cafe" },
      healthBasicEnglish: { isChecked: false, value: "Basic English" },
      healthHomeVistits: { isChecked: false, value: "Home Vistits" },
      healthSocialGroup: { isChecked: false, value: "Social Group" },
      healthHealthySmiles: { isChecked: false, value: "Healthy Smiles" },
      healthVolleyBall: { isChecked: false, value: "Volley Ball" },
      healthHeartAndStroke: { isChecked: false, value: "Heart and Stroke" },
      healthBollywoodDance: { isChecked: false, value: "Bollywood Dance" },
      healthFoodShareBus: { isChecked: false, value: "Food Share Bus" },
      healthDieticianSessions: { isChecked: false, value: "Dietician Sessions" },
      healthFoodHandling: { isChecked: false, value: "Food Handling" },
      healthAdultNutrition: { isChecked: false, value: "Adult Nutrition" },
      healthDiabetesSessions: { isChecked: false, value: "Diabetes Sessions" },
      healthHealthyChoices: { isChecked: false, value: "Healthy Choices" },
      healthHomeManagement: { isChecked: false, value: "Home Management" },
      healthStressManagement: { isChecked: false, value: "Stress Management" },
      healthCancerScreeningSpa: { isChecked: false, value: "Cancer Screening/Spa" },
      healthDiabetesManagement: { isChecked: false, value: "Diabetes Management" },
      healthSwimmingChildren: { isChecked: false, value: "Swimming Children" },
      healthSwimmingLadies: { isChecked: false, value: "Swimming Ladies" },
      healthSwimmingAquaFitMale: { isChecked: false, value: "Swimming AquaFit Male" },
      healthSwimmingAquaFitFemale: { isChecked: false, value: "Swimming AquaFit Female" }
    },

    employment: {
      tutoring: { isChecked: false, value: "Tutoring" },
      jobClub: { isChecked: false, value: "Job Club" },
      childMinding: { isChecked: false, value: "Child Minding" },
      computerBasic: { isChecked: false, value: "Computer Basic" },
      citizenshipRefugees: { isChecked: false, value: "" },
      communityAssistant: { isChecked: false, value: "Community Assistant" },
      computerIntermediate: { isChecked: false, value: "Computer Intermediate" },
      interestedInVolunteering: { isChecked: false, value: "Interested in Volunteering" },
      publicSpeaking: { isChecked: false, value: "Public Speaking Level 1 & 2" },
      foreignTrainedHealthProfessionals: { isChecked: false, value: "Foreign Trained Health Professionals" }
    },

    staff: {
      staffVolunteer: { isChecked: false, value: "Volunteer" },
      staffCommunityAssistant: { isChecked: false, value: "Community Assistant" }
    },

    neighbourhood_net: {
      neighbourhoodCitizenship: { isChecked: false, value: "Citizenship" },
      neighbourhoodIncomeTax: { isChecked: false, value: "IncomeTax" },
      neighbourhoodOther: { isChecked: false, value: "Other" }
    },

    Others: ""
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputCheckBoxHandler = inputParam => e => {
    const id = e.target.id;
    let input = this.state[inputParam];
    input[id].isChecked = !input[id].isChecked;
    this.setState({ [input]: input });
  };

  // const program_details = this.props.programDetails;
  // console.log("program_details: ", this.state.program_details);

  /* checkedValueHandler = (progId, progLabel) => e => {

    this.state.program_details.map(program => (
      if(program.programName === progLabel) {
        this.setState(prevState => ({
            health: {
              ...prevState.health,
              progId: {
                ...prevState.health.progId,
                isChecked: true
              }
            }
          }));
      }
    )
  }; */

  /*  this.state.program_details.map(program => {
      if (program.programName === "Zumba") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthZumba: {
              ...prevState.health.healthZumba,
              isChecked: true
            }
          }
        }));
      }
      if (program.programName === "Yoga") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthZumba: {
              ...prevState.health.healthYoga,
              isChecked: true
            }
          }
        }));
      } */

  render() {
    const values = this.state;

    /* if (program.programName === "Yoga") {
        this.setState({ health: { healthYoga: { isChecked: true } } });
      } */
    // });

    return (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Edit Program Details">
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder={values.registrationId} disabled />
                </div>
                <div className="col-md-2">
                  <Link to="/search">
                    <button className="btn btn-block btn-primary">Cancel</button>
                  </Link>
                </div>
              </div>

              <EditCommunityMattersProgram inputChange={this.inputChange} inputCheckBoxHandler={this.inputCheckBoxHandler} values={values} /* checkedValueHandler={this.checkedValueHandler}  */ />

              <div className="row justify-content-center">
                <div className="col col-sm-4 col-md-3 col-lg-2">
                  <Link to="/" onClick={this.handleSubmit}>
                    <button className="btn btn-block btn-success">Submit</button>
                  </Link>
                </div>
                <div className="col col-sm-4 col-md-3 col-lg-2">
                  <Link to="/search">
                    <button className="btn btn-block btn-danger">Back</button>
                  </Link>
                </div>
              </div>
            </Page>
          </div>
        </section>
      </LoadingOverlay>
    );
  }
}

export default EditProgramDetails;
