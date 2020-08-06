// Imports of libraries and components we used
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import $ from "jquery";
import { getMovies } from "../utils/utils";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import MovieOutlinedIcon from "@material-ui/icons/MovieOutlined";
import Fade from "react-reveal/Fade";

//Class component which shows all the movies we have
class MovieList extends React.Component {
  constructor(props) {
    super(props);
    // State initialize
    this.state = {
      movies: [],
      title: "",
      selectedOption: null,
      years: null,
      yearFilter: false,
      initial: false,
    };
    //Binds configuration
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //Function that handles and sets state to the year that got selected
  handleYearChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  //Function that handles and sets state to the movie name from the input
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  //Functions and processes that will be executed before render
  componentDidMount() {
    //Data fetching from API
    let data = [];
    getMovies(data);

    //Sorting the movies array by their release date
    setInterval(
      () =>
        this.setState({
          movies: data.sort(function (a, b) {
            return parseInt(b.releaseDate) - parseInt(a.releaseDate);
          }),
        }),
      3000
    );

    //Set the "years" state to contain all the release years that are available, delete duplicats & sort in decreasing order
    setInterval(
      () =>
        this.setState({
          years: data
            .map((movie) => {
              return movie.releaseDate;
            })
            .reduce(
              (uni, item) => (uni.includes(item) ? uni : [...uni, item]),
              []
            )
            .sort(function (a, b) {
              return parseInt(b) - parseInt(a);
            }),
        }),
      3500
    );

    //jQuery initialization
    let _this = this;
    $(document).on("click", ".selectBtn", function () {
      _this.setState({ yearFilter: true });
    });
    $(document).on("click", ".selectBtn2", function () {
      _this.setState({ yearFilter: false, selectedOption: null });
    });
  }

  //Function that handles onClick
  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
  }

  //Render function
  render() {
    //Opening screen case
    if (!this.state.initial) {
      return (
        <div
          style={{
            backgroundColor: "#496a81",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Fade bottom>
            <MovieOutlinedIcon style={{ fontSize: 100, color: "#b3af8f" }} />
          </Fade>
          <Fade bottom>
            <h1 style={{ color: "#b3af8f", marginBottom: 50 }}>
              !ברוכים הבאים למאגר הסרטים
            </h1>
          </Fade>
          <Fade bottom>
            <Button
              onClick={() => this.setState({ initial: true })}
              style={{ color: "#f3dfbf" }}
              variant="primary"
            >
              לכניסה למאגר לחץ כאן
            </Button>
          </Fade>
        </div>
      );

      //Initialize data case
    } else if (this.state.movies.length < 1) {
      return (
        <div
          style={{
            backgroundColor: "#496a81",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <MovieOutlinedIcon style={{ fontSize: 100, color: "#b3af8f" }} />
          <h1 style={{ color: "#b3af8f", marginBottom: 50 }}>
            ...רשימת הסרטים נטענת
          </h1>
          <CircularProgress style={{ color: "#b3af8f" }} size="7rem" />
        </div>
      );

      //Showing movies data without "release year" filter case
    } else if (!this.state.yearFilter) {
      return (
        <Container
          fluid
          style={{
            backgroundColor: "#496a81",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          class="container"
        >
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Fade bottom>
              <MovieOutlinedIcon style={{ fontSize: 100, color: "#f3dfbf" }} />
            </Fade>
            <Fade bottom>
              <h1 style={{ color: "#f3dfbf", marginRight: 20 }}>רשימת סרטים</h1>
            </Fade>
          </div>
          <Fade bottom>
            <div
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-evenly",
              }}
            >
              <input
                style={{ textAlign: "right", width: 500, height: 40 }}
                placeholder="  ...לחיפוש סרט הקלד את שמו כאן"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
          </Fade>

          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ marginLeft: 100 }}>
              <Dropdown
                options={this.state.years}
                onChange={this.handleYearChange}
                value={this.state.selectedOption}
                placeholder="בחר שנה"
              />
            </div>
            <Button
              style={{ color: "#f3dfbf" }}
              variant="primary"
              disabled={!this.state.selectedOption}
              className="selectBtn"
            >
              חפש לפי שנה
            </Button>
          </div>

          <Router>
            <Row class="row">
              {this.state.movies
                .filter((movie) => movie.title.includes(`${this.state.title}`))
                .map((movie) => {
                  return (
                    <Col
                      class="col"
                      style={{
                        marginTop: 50,
                        marginBottom: 50,
                      }}
                    >
                      {" "}
                      <Fade bottom>
                        <img
                          src={movie.imgPath}
                          style={{ width: 400, height: 600 }}
                        ></img>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              textAlign: "right",
                            }}
                          >
                            <h3 style={{ color: "#fff" }}>{movie.title}</h3>
                            <h5 style={{ color: "#fff" }}>
                              {movie.releaseDate}
                            </h5>
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
                                    <Button style={{ width: 100, height: 40 }}>
                                      בחירה
                                    </Button>
                                  </Link>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>{" "}
                      </Fade>
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

      //Showing movies data with "release year" filter case
    } else if (this.state.yearFilter) {
      return (
        <Container
          class="container"
          fluid
          style={{
            backgroundColor: "#496a81",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MovieOutlinedIcon style={{ fontSize: 100, color: "#f3dfbf" }} />

            <h1 style={{ color: "#f3dfbf", marginRight: 20 }}>רשימת סרטים</h1>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <input
              style={{ textAlign: "right", width: 500, height: 40 }}
              placeholder="  ...לחיפוש סרט הקלד את שמו כאן"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <div style={{ marginLeft: 100 }}>
              <Dropdown
                options={this.state.years}
                onChange={this.handleYearChange}
                value={this.state.selectedOption}
                placeholder="בחר שנה"
              />
            </div>
            <Button className="selectBtn2">הצג את כל הסרטים</Button>
          </div>
          <Router>
            <Row class="row">
              {this.state.movies
                .filter((movie) => movie.title.includes(`${this.state.title}`))
                .filter((movie) =>
                  movie.releaseDate.includes(
                    `${this.state.selectedOption.value}`
                  )
                )
                .map((movie) => {
                  return (
                    <Col
                      class="col"
                      style={{
                        marginTop: 50,
                        marginBottom: 50,
                      }}
                    >
                      <img
                        src={movie.imgPath}
                        style={{ width: 400, height: 600 }}
                      ></img>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "reverse-row",
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
                          <h5 style={{ color: "#fff" }}>{movie.releaseDate}</h5>
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
                                    בחירה
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
}

export default MovieList;
