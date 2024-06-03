// import { useState } from 'react'
// import { useState } from "react";
// import { useEffect, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import D3Components from "./projects/D3";
// import CCalendar from "./components/CCalendar";
// import CDatePicker from "./components/CDatePicker";
// import CustomDropdown from "./components/Dropdown/Dropdown";
// import DropdownContext from "./components/Dropdown/DropdownContext";
// import DropdownOption from "./components/Dropdown/DropdownOption";
// import DropdownProvider from "./components/Dropdown/DropdownProvider";
// import DropdownComponent from "./components/DropdownV2/Dropdown";
// import CTimePicker from "./components/TimePicker/CTimePicker";
// import TableView from "./components/AdvancedTable/CTable";
// import FixedHeaderTable from "./components/AdvancedTable/FixedHeaderTable";
// import EditableCellTable from "./components/AdvancedTable/EditableCellTable";

// import RowDragTable2 from "./components/AdvancedTable/RowDragTable2";

function App() {
  const handleFetch = async () => {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    handleFetch();
  }, []);
  return <D3Components />;
}

export default App;
