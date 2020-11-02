/* eslint-disable default-case */
import React, { Component } from "react";
import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import CommunityMattersProgram from "./CommunityMattersProgram";
import MemberDetails from "./MemberDetails";
import Overview from "./Overview";

class IRF extends Component {
  state = {
    step: 1,
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    country: "",
    mobilePhone: "",
    homePhone: "",
    workPhone: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    email: "",
    firstLanguage: "",
    aboutUs: "",
    childProgram: "",
    afterSchoolProgram: "",
    healthZumba: "",
    healthYoga: "",
    healthDental: "",
    healthKarate: "",
    healthMeditation: "",
    healthFoodMarket: "",
    healthBellyDancing: "",
    healthAdultPlus: "",
    healthEnglishCafe: "",
    healthBasicEnglish: "",
    healthHomeVistits: "",
    healthSocialGroup: "",
    healthHealthySmiles: "",
    healthVolleyBall: "",
    healthHeartAndStroke: "",
    healthFoodShareBus: "",
    healthDieticianSessions: "",
    healthFoodHandling: "",
    healthAdultNutrition: "",
    healthDiabetesSessions: "",
    healthHealthyChoices: "",
    healthHomeManagement: "",
    healthStressManagement: "",
    healthCancerScreeningSpa: "",
    healthDiabetesManagement: "",
    healthSwimmingChildren: "",
    healthSwimmingLadies: "",
    healthSwimmingAquaFitMale: "",
    healthSwimmingAquaFitFemale: "",
    healthTutoring: "",
    jobClub: "",
    childMinding: "",
    computerBasic: "",
    citizenshipRefugees: "",
    communityAssistant: "",
    computerIntermediate: "",
    interestedInVolunteering: "",
    publicSpeaking: "",
    foreignTrainedHealthProfessionals: "",
    staff: "",
    neighbourhoodNet: "",
    neighbourhoodIncomeTax: "",
    neighbourhoodOther: "",
    othersTextArea: "",
    agentNotesTextArea: "",
    memberHealth: "",
    memberSatisfaction: "",
    memberSocialNetwork: "",
    memberConnection: "",
    memberStress: "",
    memberPersonalHealth: "",
    memberFamilyDoctor: "",
    memberFamilyVisitFamilyDoctor: "",
    memberFamilyVisitClinic: "",
    memberFamilyVisitEmergencyRoom: "",
    memberFamilyVisitHospital: "",
    memberRiskFactors: "",
    memberFamilyhealthyLiving: "",
    memberFamilyPhysicallyActive: ""
  };

  inputChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  inputCheckBoxHandler = input => e => {
    this.setState({
      [input]: !this.state[input]
    });
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleSubmit = () => {
    alert("Submit to be implemented");
  };

  render() {
    const { step } = this.state;
    const values = this.state;

    switch (step) {
      case 1:
        return <BasicDetails nextStep={this.nextStep} inputChange={this.inputChange} inputClick={this.inputClick} values={values} />;
      case 2:
        return <ContactDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} />;
      case 3:
        return <CommunityMattersProgram prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} inputCheckBoxHandler={this.inputCheckBoxHandler} />;
      case 4:
        return <MemberDetails prevStep={this.prevStep} nextStep={this.nextStep} inputChange={this.inputChange} values={values} />;
      case 5:
        return <Overview prevStep={this.prevStep} handleSubmit={this.handleSubmit} inputChange={this.inputChange} values={values} />;
    }
  }
}

export default IRF;

/* 
const { firstName, middleName, lastName, gender, age, address, city, province, postal, country, mobilePhone, homePhone, workPhone, emergencyContactName, emergencyContactNumber, email, firstLanguage, aboutUs, childProgram, afterSchoolProgram, healthZumba, healthYoga, healthDental, healthKarate, healthMeditation, healthFoodMarket, healthBellyDancing, healthAdultPlus, healthEnglishCafe, healthBasicEnglish, healthHomeVistits, healthSocialGroup, healthHealthySmiles, healthVolleyBall, healthHeartAndStroke, healthFoodShareBus, healthDieticianSessions, healthFoodHandling, healthAdultNutrition, healthDiabetesSessions, healthHealthyChoices, healthHomeManagement, healthStressManagement, healthCancerScreeningSpa, healthDiabetesManagement, healthSwimmingChildren, healthSwimmingLadies, healthSwimmingAquaFitMale, healthSwimmingAquaFitFemale, healthTutoring, jobClub, childMinding, computerBasic, citizenshipRefugees, communityAssistant, computerIntermediate, interestedInVolunteering, publicSpeaking, foreignTrainedHealthProfessionals, staff, neighbourhoodNet, neighbourhoodIncomeTax, neighbourhoodOther, othersTextArea, agentNotesTextArea, memberHealth, memberSatisfaction, memberSocialNetwork, memberConnection, memberStress, memberPersonalHealth, memberFamilyDoctor, memberFamilyVisitFamilyDoctor, memberFamilyVisitClinic, memberFamilyVisitEmergencyRoom, memberFamilyVisitHospital, memberRiskFactors, memberFamilyhealthyLiving, memberFamilyPhysicallyActive } = this.state;

const values = { firstName, middleName, lastName, gender, age, address, city, province, postal, country, mobilePhone, homePhone, workPhone, emergencyContactName, emergencyContactNumber, email, firstLanguage, aboutUs, childProgram, afterSchoolProgram, healthZumba, healthYoga, healthDental, healthKarate, healthMeditation, healthFoodMarket, healthBellyDancing, healthAdultPlus, healthEnglishCafe, healthBasicEnglish, healthHomeVistits, healthSocialGroup, healthHealthySmiles, healthVolleyBall, healthHeartAndStroke, healthFoodShareBus, healthDieticianSessions, healthFoodHandling, healthAdultNutrition, healthDiabetesSessions, healthHealthyChoices, healthHomeManagement, healthStressManagement, healthCancerScreeningSpa, healthDiabetesManagement, healthSwimmingChildren, healthSwimmingLadies, healthSwimmingAquaFitMale, healthSwimmingAquaFitFemale, healthTutoring, jobClub, childMinding, computerBasic, citizenshipRefugees, communityAssistant, computerIntermediate, interestedInVolunteering, publicSpeaking, foreignTrainedHealthProfessionals, staff, neighbourhoodNet, neighbourhoodIncomeTax, neighbourhoodOther, othersTextArea, agentNotesTextArea, memberHealth, memberSatisfaction, memberSocialNetwork, memberConnection, memberStress, memberPersonalHealth, memberFamilyDoctor, memberFamilyVisitFamilyDoctor, memberFamilyVisitClinic, memberFamilyVisitEmergencyRoom, memberFamilyVisitHospital, memberRiskFactors, memberFamilyhealthyLiving, memberFamilyPhysicallyActive };     
*/
