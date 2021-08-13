import React from "react";
import Plot from "react-plotly.js";
import {useTheme} from '@material-ui/core'

export default ({
  plotlyData,
  file,
  logY = false,
  logX = false,
  type = "time",
}) => {
  const theme = useTheme();
  let layout = { title: file, autosize: true, responsive: true };
  layout = {...layout, 
    paper_bgcolor: theme.palette.background.paper,
    plot_bgcolor:theme.palette.background.paper,
    xaxis: {
      color: theme.palette.text.primary
    },
    yaxis: {
      color: theme.palette.text.secondary
    },
    legend: {
      font: {
        color: theme.palette.text.primary
      },
    },
    title: {
      font: {
        color: theme.palette.text.primary,
      }
    },
    scene: {
      xaxis: {
        color: theme.palette.text.primary
      },
      yaxis: {
        color: theme.palette.text.primary
      },
      zaxis: {
        color: theme.palette.text.primary
      },
    }

  }
  if (logX) {
    layout.xaxis = { ...layout.xaxis, type: "log" };
  }
  if (logY) {
    layout.yaxis = { ...layout.yaxis, type: "log", autorange: "true" };
  } else {
    layout.yaxis = { ...layout.yaxis, autorange: true };
  }
  if (type === "time") {
    layout.xaxis = { ...layout.xaxis, title: "Time", autorange: true };
    layout.yaxis = {
      ...layout.yaxis,
      title: "Acceleration [m/s<sup>2</sup>]",
      autorange: true,
    };
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
      style={{ width: "calc(100%-3rem)", height: "calc(100%-3rem)", }}
    />
  );
};
