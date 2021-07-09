import React, { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import Plot from "react-plotly.js";

export default () => {
  const [plotData, setPlotData] = useState([]);
  const [file, setFile] = useState(null);
  const [plotlyData, setPlotlyData] = useState([]);

  useEffect(() => {
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
          // marker: { color: "blue" },
        });
      }
      setPlotlyData(arr);
    }
  }, [plotData]);

  const handleOnDrop = (data, e) => {
    setFile(e.name);
    const rawArrayData = data.map((row) => row.data);
    const start = rawArrayData.findIndex((arr) => arr[0] === "DATA_START") + 1;
    const arrayData = rawArrayData.slice(start);

    const makeChartData = (rawData) => {
      const headers = rawData.shift(1);
      const output = [];
      for (let i = 1; i < headers.length; i++) {
        const column = rawData.map((row) => [row[0], row[i]]);
        const data = {
          id: headers[i],
          data: column.map(([x, y]) => ({
            x: new Date(x),
            y: Number(y),
          })),
        };
        output.push(data);
      }
      return output;
    };
    const chartData = makeChartData(arrayData);
    setPlotData(chartData);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setPlotData([]);
  };

  return (
    <div onDrop={(e) => handleDrop(e)}>
      <CSVReader
        onDrop={(data, e) => handleOnDrop(data, e)}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
        style={{
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
        }}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      {plotData.length !== 0 && file && plotlyData && (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plot
            data={plotlyData}
            layout={{ autosize: false, width: 1000, height: 500, title: file }}
          />
        </div>
      )}
    </div>
  );
};
