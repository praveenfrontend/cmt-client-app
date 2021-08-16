import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

// import localizer from "react-big-calendar/lib/localizers/globalize";
import Page from "../../common/Page";

import "react-big-calendar/lib/css/react-big-calendar.css";
import CreateScheduleModal from "./CreateScheduleModal";
import EditScheduleModal from "./EditScheduleModal";

import LoadingOverlay from "react-loading-overlay";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

const localizer = momentLocalizer(moment);

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [eventObj, setEventObj] = useState({});

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getSchedules() {
      try {
        setLoading(true);
        const response = await Axios.get("/schedules");

        if (response.data.length > 0) {
          setLoading(false);
          setEvents([]);
          let eventArray = [];
          response.data.map(program => {

            const fromDate = program.FromDate.split(" ");
            const ToDate = program.ToDate.split(" ");

            const event = {
              id: program.id,
              categoryName: program.Category,
              programName: program.ProgramName,
              userId: program.UserID,
              title: program.Description,
              start: fromDate[0],
              end: ToDate[0],
              startTime: fromDate[1],
              endTime: ToDate[1],
            };
            eventArray.push(event);
          });
          setEvents([...eventArray]);
        }
      } catch (e) {
        swal("Something went wrong", e.response.error, "error");
        setLoading(false);
      }
    }
    getSchedules();
  }, []);

  const scheduleModalForm = () => {
    setScheduleModal(true);
  };

  const getScheduleById = e => {
    setEditModal(true);
    setEventObj(e);
  };

  const handleEventObj = () => {
    setEventObj({});
  };

  const eventObjValues = eventObj;

  const roleType = localStorage.getItem('roleType');

  return (
    <LoadingOverlay active={loading} /* spinner={<Loader type="ThreeDots" color="#00BFFF" height={100} width={100} visible={true} />} */>
      <Page title="Schedule" schedule={ (roleType === 'Participant') ? false: true } clickHandler={scheduleModalForm}>
        <Calendar 
          popup
          selectable 
          localizer={localizer} 
          views={{month: true}} 
          events={events} 
          style={{ height: "90vh", width: "150vh" }} 
          onSelectEvent={event => getScheduleById(event)} 
          />
      </Page>
      <CreateScheduleModal scheduleModal={scheduleModal} setScheduleModal={setScheduleModal} />
      <EditScheduleModal editModal={editModal} setEditModal={setEditModal} eventObj={eventObjValues} setEventObj={handleEventObj} />
    </LoadingOverlay>
  );
}

export default Schedule;
