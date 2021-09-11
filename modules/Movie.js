
'use strict'

let movieMomery ={};
require('dotenv').config();

const axios = require('axios');



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
  function movieHandler (req, res) {
    let searchQuery = req.query.query;
    console.log(searchQuery);
    if (movieMomery[searchQuery] !== undefined) {
        res.send(movieMomery[searchQuery]);
      } else {
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

    }
  
      
   };

   module.exports = movieHandler;
  