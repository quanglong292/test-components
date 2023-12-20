// import { useState } from 'react'
import "./App.css";
import CCalendar from "./components/CCalendar";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <CCalendar
        value={[
          { date: "2023-12-17" },
          { date: "2023-12-16" },
          { date: "2023-12-15" },
          { date: "2023-11-17" },
          // { date: "2023-12-20" },
        ]}
      />
    </>
  );
}

export default App;
