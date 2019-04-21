import React from 'react';
import PageMovies from './PageMovies';

class MoviePage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <PageMovies
          commonLink="getwatchlater"
          baseUrl="/mymovies"
        />
      </>
    );
  }
}


export default MoviePage;
