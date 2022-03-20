const request = require('request')

const url =
  "http://api.weatherstack.com/current?access_key=8396276482a7a912902fd4d22c138eec&query=Mumbai";

request({url, json: true}, (error, response) => {
    const {current} = response.body;
    const {temperature, humidity} = current
    console.log(`It is currently ${temperature} degrees out. There is a ${humidity}% chance of rain.`)
})