import React from "react";
// style import
import "components/Application.scss";
// component import
import DayList from "./DayList";
import Appointment from "./Appointment";
// helper/hook import
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // define destructured state and functions from useApplicationData.js
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // fetch daily appointments and interviewers from currently selected day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  // create daily schedule of appointments using props passed
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // render Appointment component to show interviewers and to book or cancel interviews
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // render sidebar with days and lighthouse icon
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {/* limit to 5pm as last appointment time */}
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
