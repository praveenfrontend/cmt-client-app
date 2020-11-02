import React from "react";
import Page from "../../Page";
import FormInput from "../../FormInput";
import { Accordion, Card, ListGroup } from "react-bootstrap";

function Overview({ values, inputChange, prevStep, handleSubmit }) {
  function submitButton(e) {
    e.preventDefault();
    handleSubmit();
  }

  function back(e) {
    e.preventDefault();
    prevStep();
  }

  const { firstName, middleName, lastName, gender, age, address, city, province, postal, country, mobilePhone, homePhone, workPhone, emergencyContactName, emergencyContactNumber, email, firstLanguage, aboutUs, childProgram, afterSchoolProgram, healthZumba, healthYoga, healthDental, healthKarate, healthMeditation, healthFoodMarket, healthBellyDancing, healthAdultPlus, healthEnglishCafe, healthBasicEnglish, healthHomeVistits, healthSocialGroup, healthHealthySmiles, healthVolleyBall, healthHeartAndStroke, healthFoodShareBus, healthDieticianSessions, healthFoodHandling, healthAdultNutrition, healthDiabetesSessions, healthHealthyChoices, healthHomeManagement, healthStressManagement, healthCancerScreeningSpa, healthDiabetesManagement, healthSwimmingChildren, healthSwimmingLadies, healthSwimmingAquaFitMale, healthSwimmingAquaFitFemale, healthTutoring, jobClub, childMinding, computerBasic, citizenshipRefugees, communityAssistant, computerIntermediate, interestedInVolunteering, publicSpeaking, foreignTrainedHealthProfessionals, staff, neighbourhoodNet, neighbourhoodIncomeTax, neighbourhoodOther, othersTextArea, agentNotesTextArea, memberHealth, memberSatisfaction, memberSocialNetwork, memberConnection, memberStress, memberPersonalHealth, memberFamilyDoctor, memberFamilyVisitFamilyDoctor, memberFamilyVisitClinic, memberFamilyVisitEmergencyRoom, memberFamilyVisitHospital, memberRiskFactors, memberFamilyhealthyLiving, memberFamilyPhysicallyActive } = values;

  return (
    <Page title="Overview" progress={100}>
      <Accordion /* defaultActiveKey="0" */>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className="text-white">Basic Details</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>First Name: {firstName}</ListGroup.Item>
                <ListGroup.Item>Middle Name: {middleName}</ListGroup.Item>
                <ListGroup.Item>Last Name: {lastName}</ListGroup.Item>
                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                <ListGroup.Item>Age: {age}</ListGroup.Item>
                <ListGroup.Item>Street Address: {address}</ListGroup.Item>
                <ListGroup.Item>City: {city}</ListGroup.Item>
                <ListGroup.Item>Province: {province}</ListGroup.Item>
                <ListGroup.Item>Zipcode: {postal}</ListGroup.Item>
                <ListGroup.Item>Country: {country}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <div className="text-white">Contact Details</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>Mobile Phone: {mobilePhone}</ListGroup.Item>
                <ListGroup.Item>Home Phone: {homePhone}</ListGroup.Item>
                <ListGroup.Item>Work Phone: {workPhone}</ListGroup.Item>
                <ListGroup.Item>Emergency Contact Name: {emergencyContactName}</ListGroup.Item>
                <ListGroup.Item>Emergency Contact Number: {emergencyContactNumber}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item>
                <ListGroup.Item>First Language: {firstLanguage}</ListGroup.Item>
                <ListGroup.Item>How did you learn about us? {aboutUs}</ListGroup.Item>
                <ListGroup.Item>Child Program: {childProgram}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <div className="text-white">Community Matters Program</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <ListGroup>
              <ListGroup.Item>After School Program (3:30 - 6): {afterSchoolProgram}</ListGroup.Item>
              <ListGroup.Item>Health: {homePhone}</ListGroup.Item>
              <ListGroup.Item>Employment: {emergencyContactNumber}</ListGroup.Item>
              <ListGroup.Item>Staff: {staff}</ListGroup.Item>
              <ListGroup.Item>Neighbourhood Net: {}</ListGroup.Item>
              <ListGroup.Item>Others, if any: {othersTextArea}</ListGroup.Item>
              <ListGroup.Item>Agent Notes: {agentNotesTextArea}</ListGroup.Item>
            </ListGroup>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <div className="text-white">Member Details</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <br />
      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-danger" onClick={back}>
            Back
          </button>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-success" onClick={submitButton}>
            Submit
          </button>
        </div>
      </div>
    </Page>
  );
}

export default Overview;

/* 
<Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="row">
                <div className="col-md-4">
                  <FormInput icon="fas fa-user" type="text" placeholder="First Name" changeHandler={inputChange("firstName")} value={values.firstName} />
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-user" type="text" placeholder="Middle Name" changeHandler={inputChange("middleName")} value={values.middleName} />
                </div>
                <div className="col-md-4">
                  <FormInput icon="fas fa-user" type="text" placeholder="Last Name" changeHandler={inputChange("lastName")} value={values.lastName} />
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
*/
