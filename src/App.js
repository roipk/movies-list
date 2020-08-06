import React from "react";
import "./App.css";
import MovieList from "./Components/MovieList";

//Parent class component
class App extends React.Component {
  render() {
    return <MovieList />;
  }
}

export default App;
