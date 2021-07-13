import { autoType } from "d3";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ExampleTable from "./components/ExampleTable";

import FileLoader from "./components/FileLoader";

const Main = () => {
  const [fileLoaded, setFileLoaded] = useState(false);

  return (
    <div
      id="container"
      style={{
        height: "15vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3 style={{ margin: "2rem", width: "calc(100vw - 4rem)" }}>
        CSV Dataviewer
      </h3>
      <FileLoader setFileLoaded={setFileLoaded} />
      {!fileLoaded && <ExampleTable />}
    </div>
  );
};

const app = document.getElementById("app");
ReactDOM.render(<Main />, app);
