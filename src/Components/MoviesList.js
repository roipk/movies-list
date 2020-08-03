import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TestData from "./TestData";
import { Container, Row, Col } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    //flexWrap: "wrap",
    //justifyContent: "center",
    //overflow: "hidden",
    backgroundColor: "#445565",
  },
  gridList: {
    // width: 1000,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <Container fluid className={classes.root}>
      <Router>
        <GridList cellHeight={500} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
            <h1 style={{ color: "#fff" }}>רשימת סרטים</h1>
          </GridListTile>
          {TestData.map((movie) => (
            <GridListTile
              key={movie.img}
              style={{
                paddingLeft: 50,
                paddingRight: 50,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              <img src={movie.img} alt={movie.title} />
              <GridListTileBar
                title={movie.title}
                subtitle={
                  <span>
                    {" "}
                    {movie.genre} {movie.year}
                  </span>
                }
                actionIcon={
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
                          <IconButton
                            aria-label={`info about ${movie.title}`}
                            className={classes.icon}
                          >
                            <ShoppingCartIcon />
                          </IconButton>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <Switch>
          <Route path="/MovieDetails" component={MovieDetails}></Route>
        </Switch>
      </Router>
    </Container>
  );
}
