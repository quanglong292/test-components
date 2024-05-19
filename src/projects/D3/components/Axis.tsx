import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface AxisProps {
  scale: d3.AxisScale<any>;
  orientation: "top" | "right" | "bottom" | "left";
  ticks?: number;
}

const Axis: React.FC<AxisProps> = ({ scale, orientation, ticks = 5 }) => {
  const axisRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!axisRef) return;
    let axisGenerator = d3.axisBottom(scale).ticks(ticks);

    if (orientation === "top") {
      axisGenerator.tickSizeOuter(0).tickSizeInner(6);
    } else if (orientation === "right") {
      axisGenerator = d3.axisRight(scale).ticks(ticks);
      axisGenerator.tickSizeOuter(0).tickSizeInner(6).tickPadding(6);
    } else if (orientation === "bottom") {
      axisGenerator.tickSizeOuter(0).tickSizeInner(6);
    } else if (orientation === "left") {
      axisGenerator = d3.axisLeft(scale).ticks(ticks);
      axisGenerator.tickSizeOuter(0).tickSizeInner(6).tickPadding(6);
    }

    d3.select(axisRef.current).call(axisGenerator);
  }, [scale, orientation, ticks, axisRef]);

  return <g ref={axisRef} />
};

export default Axis;
