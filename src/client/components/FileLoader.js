import React, { useEffect, useState } from "react";
import { CSVReader, readRemoteFile } from "react-papaparse";
import PlotView from "./PlotView";
import makeChartData from "../utils/makeChartData";
import getFFT from "../utils/getFFT";
import remMean from "../utils/remMean";
import convertGtoSI from "../utils/convertGtoSI";
import fileDropStyle from "./FileLoaderStyle";
import CSVTable from "./CSVTable";

export default ({ fileLoaded, setFileLoaded }) => {
  const [showCsvFile, setShowCsvFile] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const [file, setFile] = useState(null);
  const [plotlyData, setPlotlyData] = useState([]);
  const [showFFT, setShowFFT] = useState(false);
  const [logYFFT, setLogYFFT] = useState(false);
  const [logXFFT, setLogXFFT] = useState(false);
  const [fftData, setFftData] = useState([]);
  const [showSample, setShowSample] = useState(false);

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

  const handleOnDrop = (data, e, sample = false) => {
    if (sample) {
      const newData = [];
      data.forEach((row) => {
        newData.push({
          data: row,
        });
      });
      data = newData;
    }
    setCsvData(data);
    setFileLoaded(true);
    setFile(e.name);
    const rawArrayData = data.map((row) => row.data);

    let start = 1;
    let arrayData;
    if (rawArrayData.findIndex((arr) => arr[0] === "DATA_START")) {
      start = rawArrayData.findIndex((arr) => arr[0] === "DATA_START") + 1;
      arrayData = rawArrayData.slice(start);
    }

    arrayData = rawArrayData.slice(start);
    const newPlotData = makeChartData(arrayData);
    setPlotData(newPlotData);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setShowCsvFile(false);
    setCsvData(null);
    setPlotData([]);
    setFftData([]);
    setShowFFT(false);
    setFileLoaded(false);
    setShowSample(false);
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
          type: "scatter",
          mode: "lines",
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

  const handleClickLogXFFT = (e) => {
    e.preventDefault();
    setLogXFFT(!logXFFT);
  };

  const handleShowCsvFile = (e) => {
    e.preventDefault();
    setShowCsvFile(!showCsvFile);
  };

  const handleShowSample = (e) => {
    e.preventDefault();
    setShowSample(true);
    const config = {
      complete: (results, file) => {
        const arg = { name: file };
        handleOnDrop(results.data, arg, true);
      },
    };
    readRemoteFile("/data/sample.csv", config);
  };

  const logButtonStyle = (prop) =>
    !prop
      ? { color: "black", margin: "1rem" }
      : { color: "green", margin: "1rem" };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        {!showSample && !fileLoaded && (
          <button onClick={handleShowSample}>Load sample data</button>
        )}
        {showSample && (
          <button onClick={handleOnRemoveFile}>Clear sample data</button>
        )}
      </div>
      <div
        onDrop={(e) => handleDrop(e)}
        style={{
          width: "95vw",
        }}
      >
        <CSVReader
          onDrop={(data, e) => handleOnDrop(data, e)}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
          style={fileDropStyle}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>

        {fileLoaded && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <button onClick={handleShowCsvFile}>Show CSV file data</button>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showCsvFile && <CSVTable data={csvData} />}
        </div>
        {plotData.length !== 0 && file && plotlyData && (
          <PlotView plotlyData={plotlyData} file={`${file} - Time History`} />
        )}

        {plotData.length !== 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button onClick={handleClick} style={{ margin: "1rem" }}>
              {fftData.length > 0 ? "Hide" : "Show"} FFT
            </button>
            {fftData.length > 0 && (
              <>
                <button
                  style={logButtonStyle(logXFFT)}
                  onClick={handleClickLogXFFT}
                >
                  logX {logXFFT ? "on" : "off"}
                </button>
                <button
                  style={logButtonStyle(logYFFT)}
                  onClick={handleClickLogYFFT}
                >
                  logY {logYFFT ? "on" : "off"}
                </button>
              </>
            )}
          </div>
        )}
        {plotData.length !== 0 && showFFT && (
          <PlotView
            plotlyData={fftData}
            file={`${file} - FFT Spectra`}
            logY={logYFFT}
            logX={logXFFT}
            type="spectra"
          />
        )}
      </div>
    </>
  );
};
