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
