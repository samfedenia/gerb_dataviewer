import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export default ({ plotlyData, file, logY = false }) => {
  let layout = {};
  if (logY) {
    layout = {
      title: file,
      autosize: true,
      responsive: true,
      yaxis: {
        type: "log",
        autorange: true,
      },
    };
  } else {
    layout = { title: file, autosize: true, responsive: true };
  }
  return (
    <Plot
      data={plotlyData}
      layout={layout}
      useResizeHandler={true}
      style={{ width: "calc(100%-1rem)", height: "calc(100%-1rem)" }}
    />
  );
};
