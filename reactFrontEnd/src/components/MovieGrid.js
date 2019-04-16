import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  Grid, Container, Header, Divider, Pagination, Segment, Responsive,
} from 'semantic-ui-react';
import { itemsFetchData, selectMovie, setPageRed } from '../actions/items';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {
  componentDidMount() {
    const { match: { params: { page } } } = this.props;
    this.triggerElements(page);
  }

  onPageChange = (e, { activePage }) => {
    const { history } = this.props;
    history.push(`/${activePage}`);
    this.triggerElements(activePage);
  }

  triggerElements(page) {
    const { fetchData, setPage } = this.props;
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
        <Grid.Column computer={4} mobile={10} stretched key={item.id} onClick={() => { handeClick(item.id); }}>
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
          <Pagination
            defaultActivePage={setedPage}
            totalPages={7}
            centered
            onPageChange={this.onPageChange}
            inverted
          />
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
  fetchData: url => dispatch(itemsFetchData(url)),
  handeClick: id => dispatch(selectMovie(id)),
  setPage: page => dispatch(setPageRed(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieGrid));
