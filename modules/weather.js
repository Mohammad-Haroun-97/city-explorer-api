'use strict'

const axios = require('axios');
require('dotenv').config;



class Forecast {
    constructor(item){
      this.date =item.valid_date;;
      this.description= item.weather.description;
    }
  }


 



function weatherHandler(req, res)  {
  
  let weatherQuery = req.query.city;
    

// http://localhost:3030/weather?query=31?longitude=30
// http://api.weatherbit.io/v2.0/forecast/daily?key=e2c95883c34745f58ae63470e722f634&lat=30&lon=32;
const weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`;

axios.get(weatherURL).then(fullWeatherData => {

  console.log(fullWeatherData);

  let wantedData = fullWeatherData.data.data.map((item) => {
    return new Forecast(item);
  });
//   console.log(wantedData);
  
  res.send(wantedData);
})
.catch(err => {
    res.send(err.message);
  });

};
module.exports = weatherHandler;


 