import { useState } from "react";

export default function useVisualMode(initial) {
  // use initial mode as its initial mode state and history state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // function to transition from previous mode to newMode
  function transition(newMode, replace = false) {
    // if replace is true, use back function to revert the last transition
    replace && back();
    setMode(newMode);
    // set history with new mode added to the end of its array
    setHistory((prev) => [...prev, newMode]);
  }
  // function to remove last transition and go back using history array
  function back() {
    if (history.length > 1) {
      // setHistory is executed async, so set state to second last item of the array
      setMode(history[history.length - 2]);
      // set new history with its last element removed from the previous history
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  return { mode, transition, back };
}
