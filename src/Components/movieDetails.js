import React from "react";
import test from "./test.jpg";

function MovieDetails({ selectedMovie }) {
  const [state, setState] = React.useState({
    movie: {
      img: "C:UsersBashBashDesktop\test.jpg",
      description: "blabla",
      year: 2010,
      title: "Batman",
      duration: 160,
      genre: "comedy",
      ageLimit: "18+",
      cast: ["musa", "amjad"],
    },
    rating: 1.6,
  });

  return (
    <section className="movieDetails">
      <div className="content">
        <div className="image">
          <img src={test} />
        </div>
        <div className="details">
          <h2>{state.movie.title}</h2>
          <div className="subDetials">
            <span>{state.movie.year} | </span>
            <span>{state.movie.ageLimit} | </span>
            <span>{state.movie.duration} | </span>
            <span>{state.movie.genre} </span>
          </div>
          <p>{state.movie.description}</p>
          <div>
            <span>Starring: </span>
            {state.movie.cast.map((author, idx) => {
              if (idx !== state.movie.cast.length - 1) {
                return <span>{author}, </span>;
              } else {
                return <span>{author}</span>;
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
