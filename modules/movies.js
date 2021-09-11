'use strict'

let movieMomery ={};
require('dotenv').config();

const axios = require('axios');

class Movie {
    constructor(item) {
      this.title = item.original_title,
      this.overview = item.overview,
      this.average_votes = item.vote_count,
      this.image_ur = item.image_ur,
      this.popularity = item.popularity,
      this.released_on = item.release_date;
    }
  }

 






const axios = require('axios');

function movieHandler (req, res)  {
    let searchQuery = req.query.city;
    console.log(searchQuery);
    if (movieMomery[searchQuery] !== undefined) {
      res.send(movieMomery[searchQuery]);
    } else {
    const movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    axios.get(movie).then(movieValue => {
      
      console.log('backend data',movieValue.data.results)
  
      let movieInfo = movieValue.data.results.map((item) => {
        return new Movie (item);
      });
      
      res.send(movieInfo);
    })
  
    
    .catch(err => {
        res.send(err.message);
      });

  }
}
;
module.exports = movieHandler;