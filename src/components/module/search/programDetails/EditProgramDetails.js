import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
    userId: this.props.registrationId,
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
      citizenshipRefugees: { isChecked: false, value: "Citizenship/Refugees" },
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

  componentDidMount() {
    let program_details = this.props.programDetails;

    // console.log(program_details);

    program_details.map(prog => {
      if (prog.programName === "Zumba") {
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
      if (prog.programName === "Yoga") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthYoga: {
              ...prevState.health.healthYoga,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Dental") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthDental: {
              ...prevState.health.healthDental,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Karate") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthKarate: {
              ...prevState.health.healthKarate,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Meditation") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthMeditation: {
              ...prevState.health.healthMeditation,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Food Market") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthFoodMarket: {
              ...prevState.health.healthFoodMarket,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Belly Dancing") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthBellyDancing: {
              ...prevState.health.healthBellyDancing,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Adult Plus") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthAdultPlus: {
              ...prevState.health.healthAdultPlus,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "English Cafe") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthEnglishCafe: {
              ...prevState.health.healthEnglishCafe,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Basic English") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthBasicEnglish: {
              ...prevState.health.healthBasicEnglish,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Home Vistits") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthHomeVistits: {
              ...prevState.health.healthHomeVistits,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Social Group") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthSocialGroup: {
              ...prevState.health.healthSocialGroup,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Healthy Smiles") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthHealthySmiles: {
              ...prevState.health.healthHealthySmiles,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Volley Ball") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthVolleyBall: {
              ...prevState.health.healthVolleyBall,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Heart and Stroke") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthHeartAndStroke: {
              ...prevState.health.healthHeartAndStroke,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Bollywood Dance") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthBollywoodDance: {
              ...prevState.health.healthBollywoodDance,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Food Share Bus") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthFoodShareBus: {
              ...prevState.health.healthFoodShareBus,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Dietician Sessions") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthDieticianSessions: {
              ...prevState.health.healthDieticianSessions,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Food Handling") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthFoodHandling: {
              ...prevState.health.healthFoodHandling,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Adult Nutrition") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthAdultNutrition: {
              ...prevState.health.healthAdultNutrition,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Diabetes Sessions") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthDiabetesSessions: {
              ...prevState.health.healthDiabetesSessions,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Healthy Choices") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthHealthyChoices: {
              ...prevState.health.healthHealthyChoices,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Home Management") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthHomeManagement: {
              ...prevState.health.healthHomeManagement,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Stress Management") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthStressManagement: {
              ...prevState.health.healthStressManagement,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Cancer Screening/Spa") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthCancerScreeningSpa: {
              ...prevState.health.healthCancerScreeningSpa,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Diabetes Management") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthDiabetesManagement: {
              ...prevState.health.healthDiabetesManagement,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Swimming Children") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthSwimmingChildren: {
              ...prevState.health.healthSwimmingChildren,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Swimming Ladies") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthSwimmingLadies: {
              ...prevState.health.healthSwimmingLadies,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Swimming AquaFit Male") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthSwimmingAquaFitMale: {
              ...prevState.health.healthSwimmingAquaFitMale,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Swimming AquaFit Female") {
        this.setState(prevState => ({
          health: {
            ...prevState.health,
            healthSwimmingAquaFitFemale: {
              ...prevState.health.healthSwimmingAquaFitFemale,
              isChecked: true
            }
          }
        }));
      }

      // Employment
      if (prog.programName === "Tutoring") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            tutoring: {
              ...prevState.employment.tutoring,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Job Club") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            jobClub: {
              ...prevState.employment.jobClub,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Child Minding") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            childMinding: {
              ...prevState.employment.childMinding,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Computer Basic") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            computerBasic: {
              ...prevState.employment.computerBasic,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Citizenship/Refugees") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            citizenshipRefugees: {
              ...prevState.employment.citizenshipRefugees,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Community Assistant") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            communityAssistant: {
              ...prevState.employment.communityAssistant,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Computer Intermediate") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            computerIntermediate: {
              ...prevState.employment.computerIntermediate,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Interested in Volunteering") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            interestedInVolunteering: {
              ...prevState.employment.interestedInVolunteering,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Public Speaking Level 1 & 2") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            publicSpeaking: {
              ...prevState.employment.publicSpeaking,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Foreign Trained Health Professionals") {
        this.setState(prevState => ({
          employment: {
            ...prevState.employment,
            foreignTrainedHealthProfessionals: {
              ...prevState.employment.foreignTrainedHealthProfessionals,
              isChecked: true
            }
          }
        }));
      }

      // Staff
      if (prog.programName === "Volunteer") {
        this.setState(prevState => ({
          staff: {
            ...prevState.staff,
            staffVolunteer: {
              ...prevState.staff.staffVolunteer,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Community Assistant") {
        this.setState(prevState => ({
          staff: {
            ...prevState.staff,
            staffCommunityAssistant: {
              ...prevState.staff.staffCommunityAssistant,
              isChecked: true
            }
          }
        }));
      }

      // neightbourhood
      if (prog.programName === "Citizenship") {
        this.setState(prevState => ({
          neighbourhood_net: {
            ...prevState.neighbourhood_net,
            neighbourhoodCitizenship: {
              ...prevState.neighbourhood_net.neighbourhoodCitizenship,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "IncomeTax") {
        this.setState(prevState => ({
          neighbourhood_net: {
            ...prevState.neighbourhood_net,
            neighbourhoodIncomeTax: {
              ...prevState.neighbourhood_net.neighbourhoodIncomeTax,
              isChecked: true
            }
          }
        }));
      }
      if (prog.programName === "Other") {
        this.setState(prevState => ({
          neighbourhood_net: {
            ...prevState.neighbourhood_net,
            neighbourhoodOther: {
              ...prevState.neighbourhood_net.neighbourhoodOther,
              isChecked: true
            }
          }
        }));
      }

      // Others checking with categoryName
      if (prog.category === "Other") {
        this.setState({
          Others: prog.programName
        });
      }
      // After School
      if (prog.category === "after_school_program") {
        this.setState({
          after_school_program: prog.programName
        });
      }
    });
  }

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

  handleSubmit = async e => {
    e.preventDefault();

    const { userId, after_school_program, health, employment, staff, neighbourhood_net, Others } = this.state;

    const userprograms = {
      health,
      employment,
      neighbourhood_net,
      staff
    };

    try {
      this.setState({ loading: true });
      const response = await Axios.post("/irf_programUpdate", { userId, after_school_program, userprograms, Others });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      alert("Please check the details or Something went wrong.");
      console.log(e.response.data);
      this.setState({ loading: false });
    }
  };

  render() {
    const values = this.state;

    console.log("program_details: ", this.state.program_details);

    return this.state.response ? (
      <Redirect to={{ pathname: "/search" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Edit Program Details">
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fa fa-id-card-o" type="text" placeholder={values.userId} disabled />
                </div>
                <div className="col-md-2">
                  <Link to="/search">
                    <button className="btn btn-block btn-primary">Cancel</button>
                  </Link>
                </div>
              </div>

              <EditCommunityMattersProgram inputChange={this.inputChange} inputCheckBoxHandler={this.inputCheckBoxHandler} values={values} />

              <div className="row justify-content-center">
                <div className="col col-sm-4 col-md-3 col-lg-2">
                  <Link to="/search" onClick={this.handleSubmit}>
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
