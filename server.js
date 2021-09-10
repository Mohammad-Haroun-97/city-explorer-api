const express = require('express');
require('dotenv').config();
const server = express(); // initialize your express app instance

const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

class Forecast {
  constructor(item){
    this.date =item.valid_date;;
    this.description = `Low of ${item.low_temp} , high of ${item.high_temp} with ${item.weather.description} `;
  }
}

// http://localhost:3030/weather?searchQuery=Amman&lat=31.9515694&lon=35.9239625

server.get('/weather',(req,res)=>{

    let searchQuery = req.query.searchQuery;
    let lat = req.query.latitude;
    let lon = req.query.longitudinal;

    const weather =  weatherData.find((item) => {
      if (item.city_name === searchQuery || item.lat === lat  || item.lon === lon) {
        return(item);
      }
  
    });
    try {
      const weatherDataArr = weather.data.map(item => {
        
        return new Forecast(item);
      });

      res.send(weatherDataArr);
      
    }
    catch(error) {
      res.send('Error! Please enter a valid city');
      console.log(weatherData);
    }
  
  });
  
  
  
  server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });