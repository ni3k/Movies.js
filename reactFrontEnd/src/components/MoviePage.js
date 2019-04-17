import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Pagination, Container, Header } from 'semantic-ui-react';
import { itemsFetchData, setPageRed, fetchGenres } from '../actions/items';
import MovieGrid from './MovieGrid';
import FilterGenres from './FilterGenres';

class MoviePage extends React.Component {
  componentDidMount() {
    const { match: { params: { page } } } = this.props;
    this.triggerElements(page);
  }

  onPageChange = (e, { activePage }) => {
    const { history } = this.props;
    history.push(`/${activePage}`);
    this.triggerElements(activePage);
  }

  triggerElements = (page) => {
    const {
      fetchData, setPage, fetchFilter, filters,
    } = this.props;
    const filterString = filters.join(',');
    setPage(page);
    fetchFilter();
    if (filters.length === 0) {
      fetchData(`/all_movies?page=${page}&limit=16`);
    } else {
      fetchData(`/by_genre?genres=${filterString}&page=${page}&limit=16`);
    }
  }

  render() {
    const {
      hasErrored, isLoading, items, setedPage,
    } = this.props;
    if (items.length === 0) { return <div> Loading </div>; }

    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Container>
        <FilterGenres onChangeHappened={this.triggerElements} />
        <Header inverted textAlign="center">All Movies</Header>
        <MovieGrid>
          <Pagination
            defaultActivePage={setedPage}
            totalPages={50}
            onPageChange={this.onPageChange}
            inverted
          />
        </MovieGrid>
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
    filters: state.filters,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(itemsFetchData(url)),
  setPage: page => dispatch(setPageRed(page)),
  fetchFilter: () => dispatch(fetchGenres()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoviePage));
