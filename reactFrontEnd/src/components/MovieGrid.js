import React from 'react';
import {
  Grid, Container, Header, Divider, Segment,
} from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setPageRed, selectMovie } from '../actions/items';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {
  componentDidMount() {

  }

  renderMovies() {
    const { items, handeClick } = this.props;
    const rendered = _.mapValues(items, (item) => {
      console.log(item);
      const description = item.description || 'no description';

      return (
        <Grid.Column
          computer={4}
          mobile={10}
          stretched
          key={item.id}
          onClick={() => { handeClick(item.id); }
          }
        >
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
    const {
      hasErrored, isLoading, items, children,
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
      <Segment inverted>
        <Container centered textAlign="center">
          <br />
          <Header size="huge" inverted> Movies </Header>
          <Divider />
          <br />
          <Grid columns={4} relaxed centered>
            {this.renderMovies()}
          </Grid>
          <br />
          { children }
        </Container>
      </Segment>
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
  handeClick: id => dispatch(selectMovie(id)),
  setPage: page => dispatch(setPageRed(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid);
