import { useState } from "react";

export default function useVisualMode(initial) {
  // use initial mode as its initial mode state and history state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // function to transition from previous mode to newMode
  function transition(newMode, replace = false) {
    // if replace is true, use back function to revert the last transition
    replace && back();
    // set history with new mode added to the end of its array
    setHistory([...history, newMode]);
    setMode(newMode);
  }
  // function to remove last transition and go back using history array
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
