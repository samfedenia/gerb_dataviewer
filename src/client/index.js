import React from "react";
import ReactDOM from "react-dom";

import FileLoader from "./components/FileLoader";

const Main = () => {
  return (
    <div id="container" style={{ height: "15vh" }}>
      <FileLoader />
    </div>
  );
};

const app = document.getElementById("app");
ReactDOM.render(<Main />, app);
