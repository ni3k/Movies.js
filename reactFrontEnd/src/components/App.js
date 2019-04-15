import React, { Component } from 'react';
import MovieGrid from './MovieGrid';


class App extends Component {
  componentDidMount() {
    console.log('s');
  }

  render() {
    return (
      <div>
        <br />
        <MovieGrid />
      </div>
    );
  }
}

export default App;
