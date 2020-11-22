import React from "react";
import Page from "../../Page";
import { Accordion, Card, ListGroup } from "react-bootstrap";

function Overview({ values, inputChange, prevStep, handleSubmit }) {
  const { firstname, middlename, lastname, gender, age, address, city, province, postal_code, country, cell_no, home_no, work_no, emergency_cntName, emergency_contNo, email_id, first_language, refer_through, child_program, after_school_program, health, employment, staff, neighbourhood_net, others, agent_notes, ques_1, ques_2, ques_3, ques_4, ques_5, ques_6, ques_7, family_doctor, walkin_clinic, emergency_room, hospital, ques_8, ques_9, ques_10 } = values;

  return (
    <Page title="Overview">
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <div className="text-white">Basic Details</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>First Name: {firstname}</ListGroup.Item>
                <ListGroup.Item>Middle Name: {middlename}</ListGroup.Item>
                <ListGroup.Item>Last Name: {lastname}</ListGroup.Item>
                <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                <ListGroup.Item>Age: {age}</ListGroup.Item>
                <ListGroup.Item>Street Address: {address}</ListGroup.Item>
                <ListGroup.Item>City: {city}</ListGroup.Item>
                <ListGroup.Item>Province: {province}</ListGroup.Item>
                <ListGroup.Item>Zipcode: {postal_code}</ListGroup.Item>
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
                <ListGroup.Item>Mobile Phone: {cell_no}</ListGroup.Item>
                <ListGroup.Item>Home Phone: {home_no}</ListGroup.Item>
                <ListGroup.Item>Work Phone: {work_no}</ListGroup.Item>
                <ListGroup.Item>Emergency Contact Name: {emergency_cntName}</ListGroup.Item>
                <ListGroup.Item>Emergency Contact Number: {emergency_contNo}</ListGroup.Item>
                <ListGroup.Item>Email: {email_id}</ListGroup.Item>
                <ListGroup.Item>First Language: {first_language}</ListGroup.Item>
                <ListGroup.Item>How did you learn about us? {refer_through}</ListGroup.Item>
                <ListGroup.Item>Child Program: {child_program}</ListGroup.Item>
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
              <ListGroup.Item>After School Program (3:30 - 6): {after_school_program}</ListGroup.Item>
              <ListGroup.Item>
                Health:
                {Object.keys(health).map((key, value) => {
                  return health[key].isChecked ? health[key].value + ", " : null;
                })}
              </ListGroup.Item>
              <ListGroup.Item>
                Employment:
                {Object.keys(employment).map((key, value) => {
                  return employment[key].isChecked ? employment[key].value + ", " : null;
                })}
              </ListGroup.Item>
              <ListGroup.Item>Staff: {staff}</ListGroup.Item>
              <ListGroup.Item>
                Neighbourhood Net:
                {Object.keys(neighbourhood_net).map((key, value) => {
                  return neighbourhood_net[key].isChecked ? neighbourhood_net[key].value + ", " : null;
                })}
              </ListGroup.Item>

              <ListGroup.Item>Others, if any: {others}</ListGroup.Item>
              <ListGroup.Item>Agent Notes: {agent_notes}</ListGroup.Item>
            </ListGroup>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            <div className="text-white">Member Details</div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>My Overall health: {ques_1}</ListGroup.Item>
                <ListGroup.Item>My Satisfaction with life: {ques_2}</ListGroup.Item>
                <ListGroup.Item>My social networks of family and friends are: {ques_3}</ListGroup.Item>
                <ListGroup.Item>My level of connection with my community is: {ques_4}</ListGroup.Item>
                <ListGroup.Item>My level of stress is: {ques_5}</ListGroup.Item>
                <ListGroup.Item>I can talk to others about my personal health issues: {ques_6}</ListGroup.Item>
                <ListGroup.Item>Do you have a family doctor?: {ques_7}</ListGroup.Item>
                <ListGroup.Item>Number of times each year I visit Family Doctor: {family_doctor}</ListGroup.Item>
                <ListGroup.Item>Number of times each year I visit Walk in Clinic: {walkin_clinic}</ListGroup.Item>
                <ListGroup.Item>Number of times each year I visit Emergency Room: {emergency_room}</ListGroup.Item>
                <ListGroup.Item>Number of times each year I visit Hospital: {hospital}</ListGroup.Item>
                <ListGroup.Item>Awareness of risk factor: {ques_8}</ListGroup.Item>
                <ListGroup.Item>Awareness of healthy living and physical activity: {ques_9}</ListGroup.Item>
                <ListGroup.Item>I am physically active: {ques_10}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <br />
      <div className="row justify-content-center">
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-danger" onClick={prevStep}>
            Back
          </button>
        </div>
        <div className="col col-sm-4 col-md-3 col-lg-2">
          <button className="btn btn-block btn-success" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Page>
  );
}

export default Overview;
