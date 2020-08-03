import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import TestData from "./TestData";
import MovieDetails from "./MovieDetails";
import $ from "jquery";

class MovieList extends React.Component {
  componentDidMount() {
    $("Button").click(function () {
      alert("kshbxjhvbxsjhv");
    });
  }
  render() {
    return (
      <Container
        fluid
        style={{
          backgroundColor: "#445565",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "#fff", marginTop: 50 }}>רשימת סרטים</h1>

        <Router>
          <Row>
            {TestData.map((movie) => {
              return (
                <Col
                  style={{
                    marginTop: 50,
                    marginBottom: 50,
                    //marginRight: 50,
                  }}
                >
                  <img
                    src={movie.img}
                    style={{ width: 400, height: 600 }}
                  ></img>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <h3 style={{ color: "#fff" }}>{movie.title}</h3>
                      <h5 style={{ color: "#fff" }}>{movie.year}</h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                      }}
                    >
                      <nav>
                        <ul>
                          <li>
                            <Link
                              to={{
                                pathname: "/MovieDetails",
                                state: {
                                  movie,
                                },
                              }}
                            >
                              <Button
                                className="selectBtn"
                                style={{ width: 100, height: 40 }}
                              >
                                info
                              </Button>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Switch>
            <Route path="/MovieDetails" component={MovieDetails}></Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default MovieList;
