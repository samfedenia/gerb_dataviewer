const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("*", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => console.log(`express server listening on port ${PORT}`));
