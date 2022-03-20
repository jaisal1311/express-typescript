import express from "express";
import request from "request";
import { findWeather } from "./utils";
const app = express();
const acceptToken = "8396276482a7a912902fd4d22c138eec";
app.get("/", (req, res) => {
  console.log("root");
  res.send("Your weather");
});

app.get("/weather", async (req, res) => {
  const { location } = req.query;
  const url = `http://api.weatherstack.com/current?access_key=8396276482a7a912902fd4d22c138eec&query=Mumbai`;

  if (location) {
    let resp = await findWeather(location.toString());
    res.send(resp);
    console.log("end");
  }
});

app.get("/help", (req, res) => {
  res.send("Help");
});

app.get("/about", (req, res) => {
  res.send("About");
});

app.listen(3000);
