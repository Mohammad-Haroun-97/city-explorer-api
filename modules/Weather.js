'use strict'

const axios = require('axios');
require('dotenv').config;





class Forecast {
    constructor(item){
      this.date =item.valid_date;;
      this.description= item.weather.description;
    }
  }
 
 
 function weatherHandler (req,res) {
     const  latitude  = req.query.lat;
     const longitude  = req.query.long;
     const searchQuery = req.query.city;
 
 // http://localhost:3030/weather?city=amman&key=e2c95883c34745f58ae63470e722f634
 
 //https://lab08-city-api.herokuapp.com/weather?city=amman&key=e2c95883c34745f58ae63470e722f634
 
 // http://api.weatherbit.io/v2.0/forecast/daily?key=e2c95883c34745f58ae63470e722f634&lat=30&lon=32;
 
 // https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}
 
 const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&lat=${latitude}&lon=${longitude}`;
 
 axios.get(weatherURL).then(fullWeatherData => {
 
 
    console.log(fullWeatherData);
 
    let wantedData = fullWeatherData.data.data.map((item) => {
      return new Forecast(item);
    });
  //   console.log(wantedData);
   
 
   res.send(wantedData);
 })
   .catch(err => {
     res.send('Error, please enter a valid Data');
     // console.log('sssdsdfsdf');
   });

 
 };

 module.exports = weatherHandler;
 
 