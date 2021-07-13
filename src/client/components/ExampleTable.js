import React from "react";

const ExampleTable = () => {
  return (
    <div style={{ width: "80vw", paddingTop: "2rem" }}>
      <h2>Example CSV file format</h2>
      <table style={{ width: "100%" }}>
        <tr>
          <th>TIME</th>
          <th>Dependent variable 1</th>
          <th>Dependent variable 2</th>
          <th>...</th>
        </tr>
        <tr>
          <td>date-time</td>
          <td>number</td>
          <td>number</td>
          <td>...</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </table>
    </div>
  );
};

export default ExampleTable;
