import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // initial state of appointments and interviewers
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // update day state to current day
  const setDay = (day) => setState({ ...state, day });

  // function to book an interview
  function bookInterview(id, interview) {
    // update appointment and appointments objects using state and passed arguments
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // axios put request to create or edit an appointment
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        updateSpots(state, appointments, state.day);
        setState({ ...state, appointments });
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }

  // function to cancel a created interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // axios delete request to remove an appointment of selected id
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        updateSpots(state, appointments, state.day);
        setState({ ...state, appointments });
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.data);
      });
  }

  // function to update remaining spots after creation or deletion of interviews
  function updateSpots(state, appointments, day) {
    let remaining = 0;
    // retrieve current day object to access its remaining spots
    const dayEntry = state.days.find((d) => d.name === day);

    for (const id of dayEntry.appointments) {
      const appoinment = appointments[id];

      // if interview does not exist for current appointment, increment remaining spot by 1
      if (!appoinment.interview) {
        remaining++;
      }
    }
    // update remaining spots after iteration for current dayEntry is complete
    dayEntry.spots = remaining;
    // return the day object with its remaining spot updated
    return dayEntry;
  }

  // re-render the page when all axios requests are fulfilled, with updated data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
