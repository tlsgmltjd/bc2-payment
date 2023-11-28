require("dotenv").config();
var EventSource = require("eventsource");
var evtSource = new EventSource("http://15.164.60.222:3000/receive");

let paymentInfomation = null;

const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

evtSource.onopen = function (e) {
  console.log(e);
};
evtSource.onmessage = function (e) {
  paymentInfomation = e.data;
  console.log(e.data);
};
evtSource.onerror = function (e) {
  console.log(e);
};

app.get("/", (req, res, next) => {
  res.send(paymentInfomation);
});

app.delete("/", (req, res, next) => {
  paymentInfomation = null;
  res.send("OK");
});

app.listen(3000, () => console.log("ok"));
