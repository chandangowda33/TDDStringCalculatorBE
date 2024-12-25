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
    const delimiterPart = parts[0].substring(2);
    if (delimiterPart.startsWith("[") && delimiterPart.endsWith("]")) {
      const delimiterPattern = delimiterPart.slice(1, -1);
      delimiter = new RegExp(
        delimiterPattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      );
    } else {
      delimiter = new RegExp(delimiterPart);
    }
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

  let smallNumArray = numberArray
    .map((num) => parseInt(num))
    .filter((num) => parseInt(num) < 1000);
  result = smallNumArray.reduce((total, number) => (total += number), 0);

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
