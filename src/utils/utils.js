import axios from "axios";
let URL = "https://image.tmdb.org/t/p/original";
const getMovies = (movies) => {
  for (let i = 1; i <= 10; i++) {
    //We send a request to the moviedb api, the request is sent with the registration key that was given to us
    //Each page has 20 movies, we chose to show 200 movies so the i (page number) runs up to 10
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=dad6e2331ec81194f217c85e049adead&language=he&sort_by=popularity.desc&include_adult=true&include_video=false&page=" +
          i
      )//The api returns an updated newly released movies.
      .then((response) => {
        let cleanData = [];
        cleanData = response.data.results.map((movie) => {
          return {       //then we do clean fo the data to take what necessary
            id: movie.id,
            description: movie.overview,
            title: movie.title,
            releaseDate: movie.release_date.slice(0, 4),
            imgPath: URL + movie.poster_path,
          };
        });
        cleanData.map((movie) => {
          axios
            .get(//iterate over each movie and send another request with the specific movie id to get the duration and genres
              "https://api.themoviedb.org/3/movie/" +
                movie.id +
                "?api_key=dad6e2331ec81194f217c85e049adead&language=he"
            )
            .then((response) => {
              movie["genres"] = response.data.genres.map((element) => {
                return element["name"];
              });
              movie["duration"] = response.data.runtime;
              movies.push(movie);//and then we pushed all the data to the movies
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return movies;
};

export { getMovies };
