const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/calculate", (req, res) => {
  let numberString = "";
  let result = 0;

  if (req.query.string) {
    numberString = decodeURIComponent(req.query.string);
    numberString = numberString.replace(/\\n/g, "\n");
  }
  console.log(numberString);

  let delimiter = /[\n,]/;

  if (numberString.startsWith("//")) {
    const parts = numberString.split("\n");
    delimiter = new RegExp(parts[0][2]);
    numberString = parts[1];
  }

  let numberArray = numberString.split(delimiter);

  let negativeNumArray = numberArray.filter((num) => parseInt(num) < 0);
  if (negativeNumArray.length) {
    return res.status(400).json({
      status: "Failed",
      message: `Negative numbers not allowed: ${negativeNumArray.join(",")}`,
    });
  }

  result = numberArray.reduce(
    (total, number) => (total += parseInt(number)),
    0
  );

  try {
    res.status(200).json({
      status: "Success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Something went wrong",
    });
    console.log(error);
  }
});

module.exports = app;
