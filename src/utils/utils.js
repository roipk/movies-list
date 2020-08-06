import axios from "axios";

let URL = "https://image.tmdb.org/t/p/original";
const getMovies = (movies) => {
  for (let i = 1; i <= 10; i++) {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=dad6e2331ec81194f217c85e049adead&language=he&sort_by=popularity.desc&include_adult=true&include_video=false&page=" +
          i
      )
      .then((response) => {
        let cleanData = [];
        cleanData = response.data.results.map((movie) => {
          return {
            id: movie.id,
            description: movie.overview,
            title: movie.title,
            releaseDate: movie.release_date.slice(0, 4),
            imgPath: URL + movie.poster_path,
          };
        });
        cleanData.map((movie) => {
          axios
            .get(
              "https://api.themoviedb.org/3/movie/" +
                movie.id +
                "?api_key=dad6e2331ec81194f217c85e049adead&language=he"
            )
            .then((response) => {
              movie["genres"] = response.data.genres.map((element) => {
                return element["name"];
              });
              movie["duration"] = response.data.runtime;
              movies.push(movie);
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
