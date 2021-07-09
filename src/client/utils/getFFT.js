const FFT = require("fft.js");
import * as d3 from "d3";

// Compute nearest lower power of 2 for n in [1, 2**31-1]:
function nearestPowerOf2(n) {
  return 1 << (31 - Math.clz32(n));
}

const getFFT = (data, sampleFreq = 256) => {
  const size = nearestPowerOf2(data.length);
  const scopedData = data.slice(0, size);
  const f = new FFT(size);
  const out = f.createComplexArray();
  f.realTransform(out, scopedData);
  //   f.fromComplexArray(out);
  const mag = [];

  for (let i = 0; i < out.length; i += 2) {
    mag.push(Math.sqrt(out[i] ** 2 + out[i + 1] ** 2));
  }
  const p = d3.precisionRound(0.1, 1.1);
  const d3f = d3.format("." + p + "r");
  const bins = d3.range(0, sampleFreq / 2, sampleFreq / (2 * size));

  return { x: bins, y: mag };
};

export default getFFT;
