import React, { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import PlotView from "./PlotView";
import makeChartData from "../utils/makeChartData";
import getFFT from "../utils/getFFT";
import remMean from "../utils/remMean";
import convertGtoSI from "../utils/convertGtoSI";
import fileDropStyle from "./FileLoaderStyle";

export default () => {
  const [plotData, setPlotData] = useState([]);
  const [file, setFile] = useState(null);
  const [plotlyData, setPlotlyData] = useState([]);
  const [showFFT, setShowFFT] = useState(false);
  const [logYFFT, setLogYFFT] = useState(true);
  const [fftData, setFftData] = useState([]);

  useEffect(() => {
    if (plotData[0]) {
      const arr = [];
      for (let i = 0; i < plotData.length; i++) {
        arr.push({
          x: plotData[i].data.map((pts) => pts.x),
          y: convertGtoSI(remMean(plotData[i].data.map((pts) => pts.y))),
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
    if (showFFT) {
      setShowFFT(!showFFT);
      setFftData([]);
    } else {
      const arr = [];
      for (let i = 0; i < plotData.length; i++) {
        const sampleFreq =
          1 / ((plotData[i].data[1].x - plotData[i].data[0].x) / 1000);

        const fftData = getFFT(
          convertGtoSI(remMean(plotData[i].data.map((pts) => pts.y))),
          sampleFreq
        );
        arr.push({
          x: fftData.x,
          y: fftData.y,
          type: "bar",
          name: plotData[i].id,
        });
      }
      setFftData(arr);
      setShowFFT(true);
    }
  };

  const handleClickLogYFFT = (e) => {
    e.preventDefault();
    setLogYFFT(!logYFFT);
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
          <PlotView plotlyData={plotlyData} file={`${file} - Time History`} />
        )}
        {plotData.length !== 0 && showFFT && (
          <PlotView
            plotlyData={fftData}
            file={`${file} - FFT Spectra`}
            logY={logYFFT}
            type="spectra"
          />
        )}
      </div>
      <button onClick={handleClick}>FFT</button>
      <button onClick={handleClickLogYFFT}>log Y axis</button>
    </>
  );
};
