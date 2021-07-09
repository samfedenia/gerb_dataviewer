import React from "react";
import Plot from "react-plotly.js";

export default ({
  plotlyData,
  file,
  logY = false,
  logX = false,
  type = "time",
}) => {
  let layout = { title: file, autosize: true, responsive: true };
  if (logX) {
    layout.xaxis = { type: "log" };
  }
  if (logY) {
    layout.yaxis = { type: "log" };
  }
  if (type === "time") {
    layout.xaxis = { ...layout.xaxis, title: "Time", autorange: true };
    layout.yaxis = { title: "Acceleration [m/s<sup>2</sup>]", autorange: true };
  }
  if (type === "spectra") {
    layout.xaxis = {
      ...layout.xaxis,
      title: "Frequency [Hz]",
      autorange: true,
    };
    layout.yaxis = {
      ...layout.yaxis,
      title: "Magnitude [dB ref 1um/s]",
    };
  }
  return (
    <Plot
      data={plotlyData}
      layout={layout}
      useResizeHandler={true}
      style={{ width: "calc(100%-3rem)", height: "calc(100%-3rem)" }}
    />
  );
};
