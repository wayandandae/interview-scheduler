import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = () => {
    let number = props.spots;
    let spot = "spots";

    if (props.spots === 0) {
      number = "no";
    }
    if (props.spots === 1) {
      spot = "spot";
    }

    return `${number} ${spot} remaining`;
  };

  props = { ...props, formatSpots };

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.formatSpots()}</h3>
    </li>
  );
}
