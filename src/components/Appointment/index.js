import React from "react";
// style import
import "./style.scss";
// component import
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
// helper/hook import
import useVisualMode from "hooks/useVisualMode";
// constants for mode transition
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const interview = props.interview;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // function to save interview with the passed props
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then((resp) => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE));
  }

  // fucntion to destroy(delete) selected interview
  function destroy() {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  // mode(display) changes depending on different conditions and props passed
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview && interview.student}
          interviewer={interview && interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={back}
          student={interview && interview.student}
          interviewer={interview && interview.interviewer}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error occurred while saving." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error occurred while deleting." onClose={back} />
      )}
    </article>
  );
}
