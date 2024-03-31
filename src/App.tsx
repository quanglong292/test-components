// import { useState } from 'react'
// import { useState } from "react";
// import { useEffect, useState } from "react";
import "./App.css";
// import CCalendar from "./components/CCalendar";
// import CDatePicker from "./components/CDatePicker";
// import CustomDropdown from "./components/Dropdown/Dropdown";
// import DropdownContext from "./components/Dropdown/DropdownContext";
// import DropdownOption from "./components/Dropdown/DropdownOption";
// import DropdownProvider from "./components/Dropdown/DropdownProvider";
// import DropdownComponent from "./components/DropdownV2/Dropdown";
// import CTimePicker from "./components/TimePicker/CTimePicker";
// import TableView from "./components/AdvancedTable/CTable";
import AdvancedTable from "./components/AdvancedTable/AdvancedTable";
// import EditableCellTable from "./components/AdvancedTable/EditableCellTable";

// import RowDragTable2 from "./components/AdvancedTable/RowDragTable2";

function App() {
  // const [count, setCount] = useState(0)
  // const [timeValue, setTimeValue] = useState<string>("13:30");

  return (
    <>
      <AdvancedTable />
      {/* <EditableCellTable /> */}

      {/* <RowDragTable2 /> */}
      {/* <CTimePicker
        onChange={(e) => {
          console.log({e});
          
          setTimeValue(e?.target?.value ?? e);
        }}
        value={timeValue}
      /> */}
      {/* <DropdownProvider>
        <div className="scroll-box">
          <CDatePicker />
          <div>Other contents</div>
          <div>Other contents</div>
          <div>Other contents</div>
          <div>Other contents</div>
          <div className="flex-box">
            <div>Other contents</div>
            <div>Other contents</div>
            <div>Other contents</div>
            <div>Other contents</div>
          </div>
          <CustomDropdown
            menu={[
              {
                label: "Menu Item 1",
                action: () => console.log("Menu Item 1"),
              },
              {
                label: "Menu Item 2",
                action: () => console.log("Menu Item 2"),
                children: <CCalendar open />,
              },
              {
                label: "Menu Item 3",
                action: () => console.log("Menu Item 3"),
                children: [
                  {
                    label: "Sub Menu 1",
                    action: () => console.log("Sub Menu 1"),
                  },
                  {
                    label: "Sub Menu 2",
                    action: () => console.log("Sub Menu 2"),
                  },
                ],
              },
              {
                label: "Menu Item 4",
                action: () => console.log("Menu Item 4"),
              },
            ]}
          >
            <button>Dropdown Button</button>
          </CustomDropdown>
          <CustomDropdown
            menu={[
              {
                label: "Menu Item 1",
                action: () => console.log("Menu Item 1"),
              },
              {
                label: "Menu Item 2",
                action: () => console.log("Menu Item 2"),
                children: <CCalendar open />,
              },
              {
                label: "Menu Item 3",
                action: () => console.log("Menu Item 3"),
                children: [
                  {
                    label: "Sub Menu 1",
                    action: () => console.log("Sub Menu 1"),
                  },
                  {
                    label: "Sub Menu 2",
                    action: () => console.log("Sub Menu 2"),
                  },
                ],
              },
              {
                label: "Menu Item 4",
                action: () => console.log("Menu Item 4"),
              },
            ]}
          >
            <button>Dropdown Button</button>
          </CustomDropdown>
          <div className="flex-box">
            <div>Other contents</div>
            <div>Other contents</div>
            <div>Other contents</div>
            <div>Other contents</div>
          </div>
          <CustomDropdown
            menu={[
              {
                label: "Menu Item 1",
                action: () => console.log("Menu Item 1"),
              },
              {
                label: "Menu Item 2",
                action: () => console.log("Menu Item 2"),
                children: <CCalendar open />,
              },
              {
                label: "Menu Item 3",
                action: () => console.log("Menu Item 3"),
                children: [
                  {
                    label: "Sub Menu 1",
                    action: () => console.log("Sub Menu 1"),
                  },
                  {
                    label: "Sub Menu 2",
                    action: () => console.log("Sub Menu 2"),
                  },
                ],
              },
              {
                label: "Menu Item 4",
                action: () => console.log("Menu Item 4"),
              },
            ]}
          >
            <button>Dropdown Button</button>
          </CustomDropdown>
        </div>
      </DropdownProvider> */}
      {/* <DropdownComponent /> */}
      {/* Anything else */}
    </>
  );
}

export default App;
