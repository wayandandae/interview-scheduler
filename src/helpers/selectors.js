// helper function to get an array of appointment objects of matching day
export function getAppointmentsForDay(state, day) {
  // define arrays to hold appointment IDs and objects
  const appointmentID = [];
  const appointmentArray = [];

  state.days.forEach((dayEntry) => {
    // spread and push to the ID array if day name of state matches the day argument
    if (dayEntry.name === day) {
      appointmentID.push(...dayEntry.appointments);
    }
  });

  appointmentID.forEach((id) => {
    // push the values of key pairs that match the IDs of appointmentID array
    for (const [key, value] of Object.entries(state.appointments)) {
      Number(key) === id && appointmentArray.push(value);
    }
  });

  return appointmentArray;
}

// helper function to get interview details
export function getInterview(state, interview) {
  // create a variable to hold detailed information of interviewer
  const detail = interview && state.interviewers[interview.interviewer];
  // if detail exists, update interview with the new information, othewise null
  return detail ? { ...interview, interviewer: detail } : null;
}
