import React, { useState } from "react";
import * as d3 from "d3";
import LinePlot from "./LinePlot";
import Axis from "./components/Axis";
import BarChart from "./components/BarChart";
import BAR_CHART_DATA from "./data/barchart-example.json";

const D3Components = () => {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));
  const x = d3.scaleLinear([0, 100], [0, 500]);
  var y = d3.scaleLinear([0, 100], [0, 500]);

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <>
      <div onMouseMove={onMouseMove}>{/* <LinePlot data={data} /> */}</div>
      {/* <Axis scale={x} orientation="bottom" ticks={10} /> */}
      {/* <svg width={600} height={600}>
        <Axis scale={y} orientation="left" ticks={10} />
        <Axis scale={x} orientation="bottom" ticks={10} />
      </svg> */}
      <BarChart data={BAR_CHART_DATA} width={500} height={500} barColor="steelblue" />
    </>
  );
};

export default D3Components;

