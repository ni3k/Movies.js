import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  Grid, Container, Header, Divider, Pagination,
} from 'semantic-ui-react';
import { itemsFetchData, selectMovie, setPageRed } from '../actions/items';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {
  componentDidMount() {
    const { fetchData, setPage, match: { params: { page } } } = this.props;
    setPage(page);
    fetchData(`/all_movies?page=${page}`);
  }

  renderMovies() {
    const { items, handeClick } = this.props;
    const rendered = _.mapValues(items, (item) => {
      console.log(item);
      let description = 'no description';
      if (item.description !== null) { description = `${item.description.substring(0, Math.min(95, item.description.length))}...`; }

      return (
        <Grid.Column stretched key={item.id} onClick={() => { handeClick(item.id); }}>
          <MovieCard
            title={item.title}
            key={item.id}
            year={item.year}
            description={description}
            rating={item.rating}
            poster={item.poster}
            id={item.id}
          />
        </Grid.Column>
      );
    });
    return _.values(rendered);
  }

  render() {
    // console.log(this.renderMovies())
    const {
      hasErrored, isLoading, items, setedPage,
    } = this.props;
    if (items.length === 0) { return <div> Loading </div>; }
    console.log(items);

    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Container centered textAlign="center">
        <Header size="huge"> Movies </Header>
        <Divider />
        <br />
        <Grid columns={4} relaxed centered>

          {this.renderMovies()}
        </Grid>
        <br />
        <Pagination defaultActivePage={setedPage} totalPages={7} centered />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    setedPage: state.setedPage,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(itemsFetchData(url)),
  handeClick: id => dispatch(selectMovie(id)),
  setPage: page => dispatch(setPageRed(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid);
