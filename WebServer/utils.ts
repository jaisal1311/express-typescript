const request = require("request");
import axios from "axios";

export const findWeather = async (location: string) => {
  const url = `http://api.weatherstack.com/current?access_key=8396276482a7a912902fd4d22c138eec&query=${location}`;
  // let resp: { temperature: number; humidity: number } = {
  //   temperature: 0,
  //   humidity: 0,
  // };
  console.log("axios");
  let resp = await axios.get(url);
  return resp.data;
};
