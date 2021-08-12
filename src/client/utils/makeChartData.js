import * as d3 from "d3";
const parser = d3.timeParse("%Y/%m/%d %H:%M:%S.%f");

const makeChartData = (rawData) => {
  const headers = rawData.shift(1);
  const output = [];
  for (let i = 1; i < headers.length; i++) {
    const column = rawData.map((row) => [row[0], row[i]]);
    const data = {
      id: headers[i],
      data: column.map(([x, y]) => ({
        x: parser(x.slice(0,-3)),
        y: Number(y),
      })),
    };
    output.push(data);
  }
  return output;
};

export default makeChartData;
