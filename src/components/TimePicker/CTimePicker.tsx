// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import "./CTimePicker.scss";

const hours = new Array(12 + 1)
  .fill("")
  .map((_, index) => (!index ? "" : index));
const minutes = new Array(60 + 1)
  .fill("")
  .map((_, index) => (!index ? "" : index));
const time = ["AM", "PM"];

const getTimeValue = (time, type) => {
  if (type && type === "PM" && time) time = time + 12;

  time = time.toString();
  if (!time) return '00'

  if (time.length === 1) time = "0" + time;

  return time;
};

const CTimePicker = (props) => {
  const { onChange, value } = props ?? {};

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectingValue, setSelectingValue] = useState([10, 10]);
  const [selectingTimeType, setSelectingTimeType] = useState("AM");

  const node = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const dropdownOptionRef = document.getElementById("dropdown-option");
    const inputRef = document.getElementById("input-time");
    if (
      node.current?.contains(e.target as Node) ||
      dropdownOptionRef?.contains(e.target as Node) ||
      inputRef?.contains(e.target as Node)
    ) {
      // inside click
      return;
    }
    // outside click
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const hour = selectingValue[0]
    const minute = selectingValue[1]

    if (!hour && !minute) return onChange('')

    onChange(
      [
        getTimeValue(selectingValue[0], selectingTimeType),
        getTimeValue(selectingValue[1]),
      ].join(":")
    );
  }, [selectingValue, selectingTimeType]);

  return (
    <div className="time-picker">
      <div className="input-time">
        <input type="time" id="input-time" value={value} onInput={onChange} />
        <span
          className="input-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          🕓
        </span>
      </div>
      {showDropdown && (
        <div className="dropdown" id="dropdown-option">
          <div className="hours">
            {hours.map((i) => (
              <div
                onClick={() => {
                  setSelectingValue([i, selectingValue[1]]);
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="minutes">
            {minutes.map((i) => (
              <div
                onClick={() => {
                  setSelectingValue([selectingValue[0], i]);
                }}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="time">
            {time.map((i) => (
              <div onClick={() => setSelectingTimeType(i)}>{i}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CTimePicker;
