import React from 'react';
import PageMovies from './PageMovies';

class MoviePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <PageMovies
        commonLink="all_movies"
        filterLink="by_genre"
        baseUrl=""
      />
    );
  }
}


export default MoviePage;
