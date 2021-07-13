import React, { useState } from "react";

export default ({ data }) => {
  return (
    <>
      {data.map((row, idx) => {
        if (idx <= 25) {
          return <p key={idx}>{row.data}</p>;
        }
      })}
      <p>...</p>
      <p>...</p>
    </>
  );
};