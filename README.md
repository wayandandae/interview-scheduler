# Interview Scheduler

<strong>Interview Scheduler</strong> is a prototype React application that allows users to manage interview appointments by <em>creating</em>, <em>editing</em>, and <em>deleting</em> them. It has a built-in <strong>database</strong> to simulate real-world situations but the data can be easily modified and saved upon user input.

The project covers fundamental concepts of <strong>React, PostgresQL, hooks, Jest,</strong> and other testing tools or frameworks. It was a great opportunity to hone both <strong>front-end and back-end development skills,</strong> as well as <strong>assertion-testing skills.</strong>

## Screenshots

!["Screenshot of Appointment on Mousehover"](https://raw.githubusercontent.com/wayandandae/interview-scheduler/master/docs/appointment-highlight.png)
!["Screenshot of Blank Student Name Error"](https://raw.githubusercontent.com/wayandandae/interview-scheduler/master/docs/error-blank-student.png)
!["Screenshot of Delete Confirmation Message"](https://raw.githubusercontent.com/wayandandae/interview-scheduler/master/docs/appointment-delete.png)

## Dependencies

- axios
- @testing-library/react-hooks
- react-test-renderer
- classnames
- normalize.css

## Getting Started

- Clone this repository and [scheduler-api](https://github.com/lighthouse-labs/scheduler-api).
- Install dependencies from <em>interview-scheduler</em> directory with `npm install`.
- Run both <em>scheduler-api</em> and <em>interview-scheduler</em> servers with `npm run start`.
- Optional: `npm run reset` in <em>scheduler-api</em> to reset database.

## Known Issues

- Few error-handling Jest tests unresolved
