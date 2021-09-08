const Movie = require('./movie');

require('dotenv').config();

const axios = require('axios');

let movieHandler = (req, res) => {
    let searchQuery = req.query.city;
    console.log(searchQuery);
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
;
module.exports = movieHandler;