import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: any[];
  width: number;
  height: number;
  barColor: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  barColor,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);

      // Clear previous chart
      svg.selectAll("*").remove();

      const width = 928;
      const height = 500;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      // Declare the x (horizontal position) scale.
      const x = d3
        .scaleBand()
        .domain(
          d3.groupSort(
            data,
            ([d]) => -d.frequency,
            (d) => d.letter
          )
        ) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      // Declare the y (vertical position) scale.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.frequency)])
        .range([height - marginBottom, marginTop]);

      // Add a rect for each bar.
      svg
        .append("g")
        .attr("fill", "steelblue")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.letter))
        .attr("y", (d) => y(d.frequency))
        .attr("height", (d) => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());

      // Add the x-axis and label.
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Add the y-axis and label, and remove the domain line.
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Frequency (%)")
        );
    }
  }, [data, width, height, barColor]);

  return <svg ref={chartRef} width={width} height={height} />;
};

export default BarChart;
