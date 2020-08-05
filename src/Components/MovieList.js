import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import $ from "jquery";
import { getMovies } from "../utils/utils";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import CircularProgress from "@material-ui/core/CircularProgress";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      title: "",
      selectedOption: null,
      years: null,
      yearFilter: "",
    };
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleYearChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  componentDidMount() {
    let data = [];
    getMovies(data);
    setInterval(() => this.setState({ movies: data }), 3000);
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
    $(this.refs.buttonEl).click(function () {
      //this.setState({ yearFilter: true });
      console.log("cnkcjndkjncd");
      alert("jcnskjnfkjn");
    });
  }
  onClick(ev) {
    let onClickFn = this.props.onClick;
    onClickFn && onClickFn(ev);
    //somehow register an event to show the ripple?
  }
  render() {
    if (this.state.movies.length < 1) {
      return (
        <div
          style={{
            backgroundColor: "#445565",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "#fff", marginTop: 50 }}>
            ...רשימת הסרטים נטענת
          </h1>
          <CircularProgress color="secondary" />
        </div>
      );
    } else {
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
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <h3 style={{ color: "#fff", marginLeft: 60 }}>
              {" "}
              : לחיפוש סרט הקלד את שמו כאן
            </h3>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <Dropdown
              options={this.state.years}
              onChange={this.handleYearChange}
              value={this.state.selectedOption}
              placeholder="בחר שנה"
            />
          </div>
          <button ref="buttonEl" onClick={this.onClick.bind(this)}>
            חפש לפי שנה
          </button> */}
          <Router>
            <Row>
              {this.state.movies
                .filter((movie) => movie.title.includes(`${this.state.title}`))
                .map((movie) => {
                  return (
                    <Col
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
