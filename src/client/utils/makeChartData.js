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

export default makeChartData;
