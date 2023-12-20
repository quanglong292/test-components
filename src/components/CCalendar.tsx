import React, { useLayoutEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import { Button, Calendar, Select, theme } from "antd";
import "./CCalendar.css";
import {
  CaretDownOutlined,
  LeftOutlined,
  RightOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

dayjs.extend(dayLocaleData);

interface CCalendarProps {
  values?: { date: string }[];
  value?: Dayjs | null;
  color?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onChange?: (e: Dayjs) => void;
  open: boolean;
}

const CCalendar = (props: CCalendarProps) => {
  const {
    value,
    values = [],
    color = "cornflowerblue",
    open,
    onChange,
    onOk,
    onCancel,
  } = props;

  if (!open) return <></>;

  const { token } = theme.useToken();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [calendarType, setCalendarType] = useState<"month" | "year">("month");

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleRemoveHighlightDates = (currentDate: Dayjs) => {
    if (calendarType === "year") return;
    setTimeout(() => {
      const cells = document.getElementsByClassName("ant-picker-cell");
      const currentDateFormated = dayjs(currentDate).format("YYYY-MM-DD");
      const validHighlights = [
        dayjs().format("YYYY-MM-DD"),
        currentDateFormated,
        ...values.map((i) => i.date),
      ];

      for (const item of cells) {
        const itemValue = item.attributes?.[0]?.nodeValue ?? "";
        // @ts-ignore
        const bgColor = item.children[0].style.backgroundColor;

        if (!validHighlights.includes(itemValue)) {
          item.classList.remove("ant-picker-cell-selected");
          // @ts-ignore
          item.children[0].style.backgroundColor = "";
        }

        if (bgColor === color && currentDateFormated === itemValue) {
          // @ts-ignore
          item.children[0].style.backgroundColor = "orangered";
        }
      }
    }, 1);
  };

  const handleSelectDate = (
    value: CCalendarProps["values"],
    currentDate: Dayjs
  ) => {
    if (!value?.length) return;
    setTimeout(() => {
      for (const item of value) {
        const element = document.querySelectorAll(
          `[title="${item.date}"]`
        )?.[0];

        if (element) {
          element.classList.add("ant-picker-cell-selected");
          // @ts-ignore
          element.children[0].style.backgroundColor = color;
        }
      }
    }, 1);
    handleRemoveHighlightDates(currentDate);
  };

  useLayoutEffect(() => {
    handleSelectDate(values, currentDate);
  }, [currentDate, values]);

  return (
    <div id="ccalendar" className="ccalendar" style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          if (type !== calendarType) onTypeChange(calendarType);

          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>
            );
          }

          const year = value.year();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            );
          }

          const handleMoveDate = (moveType: "left" | "right" | "back") => {
            const dateType = type === "month" ? "M" : "year";
            const moveTo = dayjs(value)[
              moveType === "left" ? "subtract" : "add"
            ](1, dateType);

            if (moveType === "back") return onTypeChange("month");

            if (type === "month") onChange(moveTo);
            else {
              const now = value
                .clone()
                .year(year + (moveType === "left" ? -1 : 1));
              onChange(now);
            }
          };

          return (
            <div style={{ padding: 8 }}>
              <section className="header-wrapper">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (type === "month") onTypeChange("year");
                  }}
                  className="date"
                >
                  <div>
                    {type === "month" && <span>{value.format("MMM")} </span>}
                    {type === "month" ? (
                      <span>{year}</span>
                    ) : (
                      <Select
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      >
                        {options}
                      </Select>
                    )}
                  </div>
                  {type === "month" ? (
                    <CaretDownOutlined style={{ fontSize: 10 }} />
                  ) : (
                    <Button
                      onClick={() => handleMoveDate("back")}
                      icon={<RollbackOutlined style={{ fontSize: 14 }} />}
                    ></Button>
                  )}
                </div>
                <div className="date-controller">
                  <Button
                    onClick={() => handleMoveDate("left")}
                    type="text"
                    icon={
                      <LeftOutlined style={{ fontSize: 10, strokeWidth: 30 }} />
                    }
                  ></Button>
                  <Button
                    onClick={() => handleMoveDate("right")}
                    type="text"
                    icon={<RightOutlined style={{ fontSize: 10 }} />}
                  ></Button>
                </div>
              </section>
            </div>
          );
        }}
        onPanelChange={(_, mode) => {
          setCalendarType(mode);
        }}
        onChange={(e) => {
          const isChangeYear = e.diff(currentDate, "year");

          setCurrentDate(e);
          if (onChange) onChange(e);
          if (calendarType === "year" && !isChangeYear) {
            setCalendarType("month");
          }
        }}
        value={value || dayjs()}
      />
      <section className="footer">
        <div className="picked-date">
          {dayjs(currentDate).format("DD/MM/YYYY")}
        </div>
        <div>
          <Button
            onClick={() => {
              if (onOk) onOk();
            }}
            type="text"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (onCancel) onCancel();
            }}
            type="text"
          >
            Ok
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CCalendar;
