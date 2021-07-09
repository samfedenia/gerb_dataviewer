const convertGtoSI = (arr) => {
  const scalar = 9.81; // m/s^2 per 1 G
  return arr.map((val) => val * scalar);
};

export default convertGtoSI;
