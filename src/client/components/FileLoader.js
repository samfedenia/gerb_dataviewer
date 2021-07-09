import React, { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import PlotView from "./PlotView";

import makeChartData from "../utils/makeChartData";
import getFFT from "../utils/getFFT";

export default () => {
  const [plotData, setPlotData] = useState([]);
  const [file, setFile] = useState(null);
  const [plotlyData, setPlotlyData] = useState([]);
  const [showFFT, setShowFFT] = useState(false);
  const [fftData, setFftData] = useState([]);

  const fileDropStyle = {
    dropArea: {
      borderColor: "darkslategray",
      borderRadius: 20,
    },
    dropAreaActive: {
      borderColor: "red",
    },
    dropFile: {
      width: 100,
      height: 120,
      background: "#555",
    },
    fileSizeInfo: {
      color: "#fff",
      backgroundColor: "inherit",
      borderRadius: 3,
      lineHeight: 1,
      marginBottom: "0.5em",
      padding: "0 0.5em",
    },
    fileNameInfo: {
      color: "#fff",
      backgroundColor: "inherit",
      borderRadius: 3,
      fontSize: 10,
      lineHeight: 1,
      padding: "0 0.5em",
    },
    removeButton: {
      color: "black",
    },
    progressBar: {
      backgroundColor: "#999",
      borderColor: "#222",
    },
  };

  useEffect(() => {
    console.log(plotData);
    if (plotData[0]) {
      console.log(plotData);
      const arr = [];
      for (let i = 0; i < plotData.length; i++) {
        arr.push({
          x: plotData[i].data.map((pts) => pts.x),
          y: plotData[i].data.map((pts) => pts.y),
          type: "scatter",
          mode: "lines",
          name: plotData[i].id,
        });
      }
      setPlotlyData(arr);
    }
  }, [plotData]);

  const handleOnDrop = (data, e) => {
    setFile(e.name);
    const rawArrayData = data.map((row) => row.data);
    let start = 1;
    let arrayData;
    if (rawArrayData.findIndex((arr) => arr[0] === "DATA_START")) {
      start = rawArrayData.findIndex((arr) => arr[0] === "DATA_START") + 1;
      arrayData = rawArrayData.slice(start);
    }

    arrayData = rawArrayData.slice(start);
    setPlotData(makeChartData(arrayData));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setPlotData([]);
    setFftData([]);
    setShowFFT(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const fftData = getFFT(plotData[0].data.map((pts) => pts.y));
    setFftData([
      {
        x: fftData.x,
        y: fftData.y,
        type: "bar",
        // name: plotData[i].id,
      },
    ]);
    setShowFFT(true);
  };

  return (
    <>
      <div onDrop={(e) => handleDrop(e)}>
        <CSVReader
          onDrop={(data, e) => handleOnDrop(data, e)}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
          style={fileDropStyle}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
        {plotData.length !== 0 && file && plotlyData && (
          <PlotView plotlyData={plotlyData} file={file} />
        )}
        {plotData.length !== 0 && showFFT && (
          <PlotView plotlyData={fftData} file="FFT" logY={true} />
        )}
      </div>
      <button onClick={handleClick}>FFT</button>
    </>
  );
};
