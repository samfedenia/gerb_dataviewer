import React, { useState } from "react";
import ExampleTable from "./components/ExampleTable";
import { Brightness3, Brightness7 } from '@material-ui/icons';

import FileLoader from "./components/FileLoader";

export default ({darkMode, setDarkMode}) => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const darkModeIcon = darkMode ? <Brightness7 onClick={()=>setDarkMode(!darkMode)}/> : <Brightness3 onClick={()=>setDarkMode(!darkMode)}/>

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
      <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
      <h3 style={{ margin: "2rem auto 2rem auto", width: "calc(50vw - 4rem)", }}>
        CSV Dataviewer
      </h3>
      <div style={{ margin: "2rem auto 2rem auto", width: "calc(50vw - 4rem)", textAlign: 'right'}}>{darkModeIcon}</div>

      </div>
      <FileLoader fileLoaded={fileLoaded} setFileLoaded={setFileLoaded} />
      {!fileLoaded && <ExampleTable />}
    </div>
  );
};


