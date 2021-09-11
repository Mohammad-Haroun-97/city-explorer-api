const express = require('express');
require('dotenv').config();
const axios = require('axios');
const server = express(); // initialize your express app instance

const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

class Movie {
  constructor(item) {
    this.title = item.original_title,
    this.overview = item.overview,
    this.average_votes = item.vote_count,
    this.image_ur = item.poster_path,
    this.popularity = item.popularity,
    this.released_on = item.release_date;
  }
}

// http://localhost:3030/movies?api_key=1742e55e6961c331f1b0e9a8c7b098f1&query=amman

// https://lab08-city-api.herokuapp.com/movies?api_key=1742e55e6961c331f1b0e9a8c7b098f1&query=amman

// https://api.themoviedb.org/3/search/movie?api_key=1742e55e6961c331f1b0e9a8c7b098f1&query=amman


server.get('/movies', (req, res) => {
  let searchQuery = req.query.query;
  console.log(searchQuery);
  const movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  
  axios.get(movie).then(movieValue => {
    // console.log(movieValue.data.results[0].title);
    console.log('WATCH HERE PLEASEEEEEEEEE',movieValue.data)

    let movieInfo = movieValue.data.results.map((item) => {
      return new Movie(item);
    });
    console.log(movieInfo);
    
    res.send(movieInfo);
  })

  
    .catch(err => {
      res.send('Error!, you are in catch side');
    });

});







class Forecast {
  constructor(item){
    this.date =item.valid_date;;
    this.description= item.weather.description;
  }
}

server.get('/weather', async (req, res) => {
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

});


  
  
  
  server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });



  //////////////////