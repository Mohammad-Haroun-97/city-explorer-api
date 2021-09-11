const express = require('express');
require('dotenv').config();
const axios = require('axios');
const server = express(); // initialize your express app instance

const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

const movieHandler = require('./modules/Movie');
const weatherHandler = require('./modules/Weather');




server.get('/movies',movieHandler );


server.get('/weather',weatherHandler);




  
  server.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
  });

             






