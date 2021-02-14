import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

import Page from "../../../common/Page";
import Container from "../../../common/Container";
import FormInput from "../../../FormFields/FormInput";

class UpdateHealthDetails extends Component {
  state = {
    response: false,
    loading: false,
    userId: this.props.registrationId,
    healthList: [],
    healthNewState: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    stressNewState: ["High", "Quiet a lot", "Depends", "Manageable", "Low"],
    personalHealthNewState: ["Never", "When it is urgent", "If I am upset", "Sometimes", "All the time"],
    healthDetails: this.props.healthDetails,

    OverallHealth: "",
    LifeSatisfaction: "",
    SocialNetwork: "",
    CommunityConnection: "",
    StressLevel: "",
    PersonalHealthIssues: "",
    FamilyDoctor: "",
    FamilyDoctorVisit: "",
    ClinicVisit: "",
    EmergencyVisit: "",
    HospitalVisit: "",
    DiseasesAwareness: "",
    CommunityAwareness: "",
    PhysicalActivity: "",
    OverallHealth_prog: "",
    LifeSatisfaction_prog: "",
    SocialNetwork_prog: "",
    CommunityConnection_prog: "",
    StressLevel_prog: "",
    PersonalHealthIssues_prog: "",
    FamilyDoctor_prog: "",
    DiseasesAwareness_prog: "",
    CommunityAwareness_prog: "",
    PhysicalActivity_prog: "",

    myHealth: "",
    myhealth_curr_state: "",
    myhealth_curr_prog: "",

    myLifeSatisfaction: "",
    mylifesatisfaction_curr_state: "",
    mylifesatisfaction_curr_prog: "",

    mySocialNetwork: "",
    mysocialnetwork_curr_state: "",
    mysocialnetwork_curr_prog: "",

    myCommunityNetwork: "",
    mycommunitynetwork_curr_state: "",
    mycommunitynetwork_curr_prog: "",

    myStressLevel: "",
    mystresslevel_curr_state: "",
    mystresslevel_curr_prog: "",

    myHealthIssues: "",
    myhealthissues_curr_state: "",
    myhealthissues_curr_prog: "",

    myFamilyDoctor: "",
    myfamilydoctor_curr_state: "",
    myfamilydoctor_curr_prog: "",

    myCmtProgramAwareness: "",
    mycmtprogramawareness_curr_state: "",
    mycmtprogramawareness_curr_prog: "",

    myDiseaseAwareness: "",
    mydiseaseawareness_curr_state: "",
    mydiseaseawareness_curr_prog: "",

    myPhysicalActiveness: "",
    myphysicalactiveness_curr_state: "",
    myphysicalactiveness_curr_prog: "",

    myVisitToClinic: "",
    myvisittoclinic_curr_state: "",

    myVisitToEmergency: "",
    myvisittoemergency_curr_state: "",

    myVisitToFamilyDoctor: "",
    myvisittofamilydoctor_curr_state: "",

    myVisitToHospital: "",
    myvisittohospital_curr_state: ""
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({ myHealth: this.props.healthDetails[0].myHealth });
    this.setState({ myhealth_curr_prog: this.props.healthDetails[0].myhealth_curr_prog });
    this.setState({ myhealth_curr_state: this.props.healthDetails[0].myhealth_curr_state });

    this.setState({ myLifeSatisfaction: this.props.healthDetails[0].myLifeSatisfaction });
    this.setState({ mylifesatisfaction_curr_state: this.props.healthDetails[0].mylifesatisfaction_curr_state });
    this.setState({ mylifesatisfaction_curr_prog: this.props.healthDetails[0].mylifesatisfaction_curr_prog });

    this.setState({ mySocialNetwork: this.props.healthDetails[0].mySocialNetwork });
    this.setState({ mysocialnetwork_curr_state: this.props.healthDetails[0].mysocialnetwork_curr_state });
    this.setState({ mysocialnetwork_curr_prog: this.props.healthDetails[0].mysocialnetwork_curr_prog });

    this.setState({ myCommunityNetwork: this.props.healthDetails[0].myCommunityNetwork });
    this.setState({ mycommunitynetwork_curr_state: this.props.healthDetails[0].mycommunitynetwork_curr_state });
    this.setState({ mycommunitynetwork_curr_prog: this.props.healthDetails[0].mycommunitynetwork_curr_prog });

    this.setState({ myStressLevel: this.props.healthDetails[0].myStressLevel });
    this.setState({ mystresslevel_curr_state: this.props.healthDetails[0].mystresslevel_curr_state });
    this.setState({ mystresslevel_curr_prog: this.props.healthDetails[0].mystresslevel_curr_prog });

    this.setState({ myHealthIssues: this.props.healthDetails[0].myHealthIssues });
    this.setState({ myhealthissues_curr_state: this.props.healthDetails[0].myhealthissues_curr_state });
    this.setState({ myhealthissues_curr_prog: this.props.healthDetails[0].myhealthissues_curr_prog });

    this.setState({ myFamilyDoctor: this.props.healthDetails[0].myFamilyDoctor });
    this.setState({ myfamilydoctor_curr_state: this.props.healthDetails[0].myfamilydoctor_curr_state });
    this.setState({ myfamilydoctor_curr_prog: this.props.healthDetails[0].myfamilydoctor_curr_prog });

    this.setState({ myCmtProgramAwareness: this.props.healthDetails[0].myCmtProgramAwareness });
    this.setState({ mycmtprogramawareness_curr_state: this.props.healthDetails[0].mycmtprogramawareness_curr_state });
    this.setState({ mycmtprogramawareness_curr_prog: this.props.healthDetails[0].mycmtprogramawareness_curr_prog });

    this.setState({ myDiseaseAwareness: this.props.healthDetails[0].myDiseaseAwareness });
    this.setState({ mydiseaseawareness_curr_state: this.props.healthDetails[0].mydiseaseawareness_curr_state });
    this.setState({ mydiseaseawareness_curr_prog: this.props.healthDetails[0].mydiseaseawareness_curr_prog });

    this.setState({ myPhysicalActiveness: this.props.healthDetails[0].myPhysicalActiveness });
    this.setState({ myphysicalactiveness_curr_state: this.props.healthDetails[0].myphysicalactiveness_curr_state });
    this.setState({ myphysicalactiveness_curr_prog: this.props.healthDetails[0].myphysicalactiveness_curr_prog });

    this.setState({ myVisitToFamilyDoctor: this.props.healthDetails[0].myVisitToFamilyDoctor });
    this.setState({ myvisittofamilydoctor_curr_state: this.props.healthDetails[0].myvisittofamilydoctor_curr_state });

    this.setState({ myVisitToClinic: this.props.healthDetails[0].myVisitToClinic });
    this.setState({ myvisittoclinic_curr_state: this.props.healthDetails[0].myvisittoclinic_curr_state });

    this.setState({ myVisitToEmergency: this.props.healthDetails[0].myVisitToEmergency });
    this.setState({ myvisittoemergency_curr_state: this.props.healthDetails[0].myvisittoemergency_curr_state });

    this.setState({ myVisitToHospital: this.props.healthDetails[0].myVisitToHospital });
    this.setState({ myvisittohospital_curr_state: this.props.healthDetails[0].myvisittohospital_curr_state });

    try {
      const response = await Axios.get(`/gethealth_programs/${this.state.userId}`);

      if (response.data.success === true) {
        this.setState({ loading: false });
      }

      const healthPrograms = response.data.data;
      healthPrograms.map(program => {
        this.setState({ healthList: [...this.state.healthList, program] });
      });
    } catch (e) {
      swal("Something went wrong", e.response.data, "error");
      this.setState({ loading: false });
    }
  }

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });

    const { userId, OverallHealth, LifeSatisfaction, SocialNetwork, CommunityConnection, StressLevel, PersonalHealthIssues, FamilyDoctor, FamilyDoctorVisit, ClinicVisit, EmergencyVisit, HospitalVisit, DiseasesAwareness, CommunityAwareness, PhysicalActivity, OverallHealth_prog, LifeSatisfaction_prog, SocialNetwork_prog, CommunityConnection_prog, StressLevel_prog, PersonalHealthIssues_prog, FamilyDoctor_prog, DiseasesAwareness_prog, CommunityAwareness_prog, PhysicalActivity_prog } = this.state;

    try {
      const response = await Axios.post("/irf_addHealth", { userId, OverallHealth, LifeSatisfaction, SocialNetwork, CommunityConnection, StressLevel, PersonalHealthIssues, FamilyDoctor, FamilyDoctorVisit, ClinicVisit, EmergencyVisit, HospitalVisit, DiseasesAwareness, CommunityAwareness, PhysicalActivity, OverallHealth_prog, LifeSatisfaction_prog, SocialNetwork_prog, CommunityConnection_prog, StressLevel_prog, PersonalHealthIssues_prog, FamilyDoctor_prog, DiseasesAwareness_prog, CommunityAwareness_prog, PhysicalActivity_prog });

      if (response.data.success === true) {
        this.setState({ loading: false });
        this.setState({ response: true });
      }
    } catch (e) {
      swal("Please update all fields!", e.response.data, "error");
      this.setState({ loading: false });
    }
  };

  render() {
    const values = this.state;

    return this.state.response ? (
      <Redirect to={{ pathname: "/search" }} />
    ) : (
      <LoadingOverlay active={this.state.loading} spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />}>
        <section className="forms">
          <div className="container-fluid">
            <Page title="Update Member Health Details">
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

              <Container title="Health Details">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-body">
                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Health Question</th>
                                  <th>Initial Status</th>
                                  <th>Current Status</th>
                                  <th>Program</th>
                                  <th>Select Program</th>
                                  <th>New State</th>
                                </tr>
                              </thead>
                              <tbody>
                                <React.Fragment>
                                  <tr>
                                    <td>Overall Health</td>
                                    <td>{this.state.myHealth}</td>
                                    <td>{this.state.myhealth_curr_state === null ? "NA" : this.state.myhealth_curr_state}</td>
                                    <td>{this.state.myhealth_curr_prog === null ? "NA" : this.state.myhealth_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myhealth_curr_prog} onChange={this.inputChange("OverallHealth_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myhealth_curr_state} onChange={this.inputChange("OverallHealth")}>
                                        <option value="">Select</option>
                                        {this.state.healthNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Satisfaction with Life</td>
                                    <td>{this.state.myLifeSatisfaction}</td>
                                    <td>{this.state.mylifesatisfaction_curr_state === null ? "NA" : this.state.mylifesatisfaction_curr_state}</td>
                                    <td>{this.state.mylifesatisfaction_curr_prog === null ? "NA" : this.state.mylifesatisfaction_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mylifesatisfaction_curr_prog} onChange={this.inputChange("LifeSatisfaction_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mylifesatisfaction_curr_state} onChange={this.inputChange("LifeSatisfaction")}>
                                        <option value="">Select</option>
                                        {this.state.healthNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Social Network of Family and Friends</td>
                                    <td>{this.state.mySocialNetwork}</td>
                                    <td>{this.state.mysocialnetwork_curr_state === null ? "NA" : this.state.mysocialnetwork_curr_state}</td>
                                    <td>{this.state.mysocialnetwork_curr_prog === null ? "NA" : this.state.mysocialnetwork_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mysocialnetwork_curr_prog} onChange={this.inputChange("SocialNetwork_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mysocialnetwork_curr_state} onChange={this.inputChange("SocialNetwork")}>
                                        <option value="">Select</option>
                                        {this.state.healthNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Connection with community</td>
                                    <td>{this.state.myCommunityNetwork}</td>
                                    <td>{this.state.mycommunitynetwork_curr_state === null ? "NA" : this.state.mycommunitynetwork_curr_state}</td>
                                    <td>{this.state.mycommunitynetwork_curr_prog === null ? "NA" : this.state.mycommunitynetwork_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mycommunitynetwork_curr_prog} onChange={this.inputChange("CommunityConnection_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mycommunitynetwork_curr_state} onChange={this.inputChange("CommunityConnection")}>
                                        <option value="">Select</option>
                                        {this.state.healthNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Level of Stress</td>
                                    <td>{this.state.myStressLevel}</td>
                                    <td>{this.state.mystresslevel_curr_state === null ? "NA" : this.state.mystresslevel_curr_state}</td>
                                    <td>{this.state.mystresslevel_curr_prog === null ? "NA" : this.state.mystresslevel_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mystresslevel_curr_prog} onChange={this.inputChange("StressLevel_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mystresslevel_curr_state} onChange={this.inputChange("StressLevel")}>
                                        <option value="">Select</option>
                                        {this.state.stressNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Talk to others about personal health issues</td>
                                    <td>{this.state.myHealthIssues}</td>
                                    <td>{this.state.myhealthissues_curr_state === null ? "NA" : this.state.myhealthissues_curr_state}</td>
                                    <td>{this.state.myhealthissues_curr_prog === null ? "NA" : this.state.myhealthissues_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myhealthissues_curr_prog} onChange={this.inputChange("PersonalHealthIssues_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myhealthissues_curr_state} onChange={this.inputChange("PersonalHealthIssues")}>
                                        <option value="">Select</option>
                                        {this.state.personalHealthNewState.map(state => (
                                          <option>{state}</option>
                                        ))}
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Has a Family Doctor</td>
                                    <td>{this.state.myFamilyDoctor}</td>
                                    <td>{this.state.myfamilydoctor_curr_state === null ? "NA" : this.state.myfamilydoctor_curr_state}</td>
                                    <td>{this.state.myfamilydoctor_curr_prog === null ? "NA" : this.state.myfamilydoctor_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myfamilydoctor_curr_prog} onChange={this.inputChange("FamilyDoctor_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myfamilydoctor_curr_state} onChange={this.inputChange("FamilyDoctor")}>
                                        <option value="">Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Awareness on risk factors for diabetes, cancer and cardiovascular diseases</td>
                                    <td>{this.state.myDiseaseAwareness}</td>
                                    <td>{this.state.mydiseaseawareness_curr_state === null ? "NA" : this.state.mydiseaseawareness_curr_state}</td>
                                    <td>{this.state.mydiseaseawareness_curr_prog === null ? "NA" : this.state.mydiseaseawareness_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mydiseaseawareness_curr_prog} onChange={this.inputChange("DiseasesAwareness_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mydiseaseawareness_curr_state} onChange={this.inputChange("DiseasesAwareness")}>
                                        <option value="">Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Awareness on facilities, programs, parks, playgrounds within community for healthy living and physical activity</td>
                                    <td>{this.state.myCmtProgramAwareness}</td>
                                    <td>{this.state.mycmtprogramawareness_curr_state === null ? "NA" : this.state.mycmtprogramawareness_curr_state}</td>
                                    <td>{this.state.mycmtprogramawareness_curr_prog === null ? "NA" : this.state.mycmtprogramawareness_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mycmtprogramawareness_curr_prog} onChange={this.inputChange("CommunityAwareness_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.mycmtprogramawareness_curr_state} onChange={this.inputChange("CommunityAwareness")}>
                                        <option value="">Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Physical activity</td>
                                    <td>{this.state.myPhysicalActiveness}</td>
                                    <td>{this.state.myphysicalactiveness_curr_state === null ? "NA" : this.state.myphysicalactiveness_curr_state}</td>
                                    <td>{this.state.myphysicalactiveness_curr_prog === null ? "NA" : this.state.myphysicalactiveness_curr_prog}</td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myphysicalactiveness_curr_prog} onChange={this.inputChange("PhysicalActivity_prog")}>
                                        <option value="">Select</option>
                                        {this.state.healthList.map(program => {
                                          return <option value={program}>{program}</option>;
                                        })}
                                      </select>
                                    </td>
                                    <td>
                                      <select name="account" class="form-control" value={this.state.myphysicalactiveness_curr_state} onChange={this.inputChange("PhysicalActivity")}>
                                        <option value="">Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                      </select>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Number of visits each year - Family Doctor</td>
                                    <td>{this.state.myVisitToFamilyDoctor}</td>
                                    <td>{this.state.myvisittofamilydoctor_curr_state === null ? "NA" : this.state.myvisittofamilydoctor_curr_state}</td>
                                    <td>{"NA"}</td>
                                    <td>{"NA"}</td>
                                    <td>
                                      <div className="form-group">
                                        <div className="input-group input-group-mb">
                                          <input type="text" className="form-control" autoComplete="off" onChange={this.inputChange("FamilyDoctorVisit")} value={this.state.myvisittofamilydoctor_curr_state} />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Number of visits each year - Walk In Clinic</td>
                                    <td>{this.state.myVisitToClinic}</td>
                                    <td>{this.state.myvisittoclinic_curr_state === null ? "NA" : this.state.myvisittoclinic_curr_state}</td>
                                    <td>{"NA"}</td>
                                    <td>{"NA"}</td>
                                    <td>
                                      <div className="form-group">
                                        <div className="input-group input-group-mb">
                                          <input type="text" className="form-control" autoComplete="off" onChange={this.inputChange("ClinicVisit")} value={this.state.myvisittoclinic_curr_state} />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Number of visits each year - Emergency Room</td>
                                    <td>{this.state.myVisitToEmergency}</td>
                                    <td>{this.state.myvisittoemergency_curr_state === null ? "NA" : this.state.myvisittoemergency_curr_state}</td>
                                    <td>{"NA"}</td>
                                    <td>{"NA"}</td>
                                    <td>
                                      <div className="form-group">
                                        <div className="input-group input-group-mb">
                                          <input type="text" className="form-control" autoComplete="off" onChange={this.inputChange("EmergencyVisit")} value={this.state.myvisittoemergency_curr_state} />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>Number of visits each year - Hospital</td>
                                    <td>{this.state.myVisitToHospital}</td>
                                    <td>{this.state.myvisittohospital_curr_state === null ? "NA" : this.state.myvisittohospital_curr_state}</td>
                                    <td>{"NA"}</td>
                                    <td>{"NA"}</td>
                                    <td>
                                      <div className="form-group">
                                        <div className="input-group input-group-mb">
                                          <input type="text" className="form-control" autoComplete="off" onChange={this.inputChange("HospitalVisit")} value={this.state.myvisittohospital_curr_state} />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </React.Fragment>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

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

export default UpdateHealthDetails;
