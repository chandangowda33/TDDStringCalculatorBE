const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/calculate/:string", (req, res) => {
  let numberString = "";
  let result = 0;

  if (req.params) numberString = req.params.string;

  //initially delimiter is ','
  let numberArray = numberString.split(",");

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
    res
      .status(400)
      .json({
        status: "Failed",
        message: "Something went wrong",
      })
      .then(() => console.log(error));
  }
});

module.exports = app;
