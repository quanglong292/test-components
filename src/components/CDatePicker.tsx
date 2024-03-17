import { DatePicker } from "antd";
import { memo, useEffect, useState } from "react";
import CCalendar from "./CCalendar";
import "./CDatePicker.css";
import { Dayjs } from "dayjs";

const matchAny = (arr1: string[], arr2 = []) => {
  return Boolean(
    arr1.findIndex((i: string) =>
      Boolean([...arr2].findIndex((j) => j === i) !== -1)
    ) !== -1
  );
};

const CDatePicker = memo(() => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectingDate, setSelectingDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const validElements = [
        "ant-picker-calendar-date-value",
        "ant-picker",
        "ant-picker-focused",
        "ant-picker-input",
        "ant-picker-cell",
        "ant-picker-cell-in-view",
      ];
      // @ts-ignore
      const elementClasses = event.target.classList || [];
      // @ts-ignore
      const isClickedOutSide = !event.target.closest("#ccalendar");
      const validClicks = matchAny(validElements, elementClasses);
      // @ts-ignore
      const isClickedOutSideInput = !event.target.closest("#cdate-picker");

      if (isClickedOutSide && isClickedOutSideInput && !validClicks)
        setShowCalendar(false);
      if (!isClickedOutSideInput) setShowCalendar(true);
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <>
      <div className="cdate-picker-wrapper">
        <DatePicker
          id="cdate-picker"
          onFocus={() => {
            setShowCalendar(true);
          }}
          value={selectingDate}
          onChange={(e) => {
            if (!e) setSelectingDate(null);
          }}
        />
        <CCalendar
          onChange={(e) => {
            setSelectingDate(e);
          }}
          onOk={() => setShowCalendar(false)}
          onCancel={() => setShowCalendar(false)}
          open={showCalendar}
          value={selectingDate}
        />
      </div>
    </>
  );
});

export default CDatePicker;
