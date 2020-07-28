import React from "react";
import test from "./test.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@material-ui/core";

function MovieDetails({ selectedMovie }) {
  const [state, setState] = React.useState({
    movie: {
      img: "C:UsersBashBashDesktop\test.jpg",
      description: "blabl",
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
    <Container>
      <Row>
        <section className="movieDetails">
          <div className="content">
            <Col xs={4}>
              <div className="image">
                <img src={test} alt="" />
              </div>
            </Col>
            <Col xs={6}>
              <div className="details">
                <h1>{state.movie.title}</h1>
                <div className="subDetails">
                  <span>{state.movie.year} | </span>
                  <span>{state.movie.ageLimit} | </span>
                  <span>{state.movie.duration} | </span>
                  <span>{state.movie.genre} </span>
                  <div>
                    <Typography variant="body1" gutterBottom>
                      {state.movie.description}
                    </Typography>
                  </div>
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
            </Col>
          </div>
        </section>
      </Row>
    </Container>
  );
}

export default MovieDetails;
