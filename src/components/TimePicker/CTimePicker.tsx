// @ts-nocheck

import React from "react";
import "./CTimePicker.scss";

const hours = new Array(12 + 1).fill("").map((_, index) => index);
const minutes = new Array(60 + 1).fill("").map((_, index) => index);
const time = ["AM", "PM"];

const CTimePicker = (props) => {
  const { onChange, value, defaultValue } = props ?? {};
  return (
    <div className="time-picker">
      <input type="time" />
      <div className="dropdown">
        <div className="hours">
          {hours.map((i) => (
            <div>{i}</div>
          ))}
        </div>
        <div className="minutes">
          {minutes.map((i) => (
            <div>{i}</div>
          ))}
        </div>
        <div className="time">
          {time.map((i) => (
            <div>{i}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTimePicker;
