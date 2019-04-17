import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import { itemsFetchData, setPageRed } from '../actions/items';
import MovieGrid from './MovieGrid';

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

  triggerElements(page) {
    const { fetchData, setPage } = this.props;
    setPage(page);
    fetchData(`/all_movies?page=${page}&limit=16`);
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
      <MovieGrid>
        <Pagination
          defaultActivePage={setedPage}
          totalPages={7}
          centered
          onPageChange={this.onPageChange}
          inverted
        />
      </MovieGrid>
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
  setPage: page => dispatch(setPageRed(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MoviePage));
