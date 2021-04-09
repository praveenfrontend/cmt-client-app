import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
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

  // const [events, setEvents] = useState([
  //   {
  //     id: 0,
  //     title: "Zumba",
  //     start: new Date(2021, 3, 7),
  //     end: new Date(2021, 3, 7)
  //   }
  // ]);
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
            const event = {
              id: program.id,
              userId: program.UserID,
              title: program.Title,
              programID: program.ProgramID,
              start: program.StartDate,
              end: program.EndDate,
              startTime: program.StartTime,
              endTime: program.EndTime,
              instructor: program.Instructor,
              location: program.Location
            };
            eventArray.push(event);
          });
          setEvents([...eventArray]);
          // swal(`Schedule Created.`, "Program will be added to the calendar.", "success").then(res => {
          // setLoading(true);
          // window.location.reload();
          // });
        }
      } catch (e) {
        swal("Something went wrong", e.response.error, "error");
        setLoading(false);
      }
    }
    getSchedules();
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      // this.setState({
      //   events: [
      //     ...this.state.events,
      //     {
      //       start,
      //       end,
      //       title
      //     }
      //   ]
      // });

      setEvents([
        ...events,
        {
          start,
          end,
          title
        }
      ]);
    }
  };

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

  return (
    <>
      <Page title="Schedule" schedule={true} clickHandler={scheduleModalForm}>
        <Calendar selectable localizer={localizer} defaultDate={new Date()} /* defaultView="month" */ defaultView={Views.MONTH} events={events} style={{ height: "100vh" }} onSelectEvent={event => getScheduleById(event)} /* onSelectSlot={handleSelect} */ />
        {/* <Calendar selectable localizer={localizer} events={events} defaultView={Views.MONTH} scrollToTime={new Date(1970, 1, 1, 6)} defaultDate={new Date(2021, 3, 8)} onSelectEvent={event => alert(event.title)} onSelectSlot={handleSelect} /> */}
      </Page>
      <CreateScheduleModal scheduleModal={scheduleModal} setScheduleModal={setScheduleModal} />
      <EditScheduleModal editModal={editModal} setEditModal={setEditModal} eventObj={eventObj} setEventObj={handleEventObj} />
    </>
  );
}

export default Schedule;
