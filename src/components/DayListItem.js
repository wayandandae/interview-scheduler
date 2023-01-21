import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (spots) => {
    let number = spots;
    let spot = "spots";

    if (spots === 0) {
      number = "no";
    }
    if (spots === 1) {
      spot = "spot";
    }

    return `${number} ${spot} remaining`;
  };

  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}
