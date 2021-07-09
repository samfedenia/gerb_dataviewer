import * as d3 from "d3";

const remMean = (arr) => {
  const mean = d3.mean(arr);
  const meanRemoved = arr.map((val) => val - mean);
  return meanRemoved;
};

export default remMean;
