import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';
import { fetchSearchTerm, setPageRed } from '../actions/items';
import MovieGrid from './MovieGrid';

class SearchPage extends React.Component {
  componentDidMount() {
    const { match: { params: { page } } } = this.props;
    this.triggerElements(page);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    const { searchTerm: prevSearchTerm } = prevProps;
    const {
      searchTerm, fetchSearchTerm: searchNow, history, setPageRed: setPage 
    } = this.props;
    if (searchTerm !== prevSearchTerm) {
      searchNow(1);
      setPage(1);
      history.push('/search/1');
    }
  }

  triggerElements = (page) => {
    const {
      setPageRed: setPage, fetchSearchTerm: searchNow,
    } = this.props;
    setPage(page);
    searchNow(page);
  }

  onPageChange = (e, { activePage }) => {
    const { history } = this.props;
    history.push(`/search/${activePage}`);
    this.triggerElements(activePage);
  }

  render() {
    const { setedPage, pagination } = this.props;
    return (
      <MovieGrid>
        <Pagination
          defaultActivePage={setedPage}
          totalPages={pagination}
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
    searchTerm: state.searchTerm,
    setedPage: state.setedPage,
    pagination: state.pagination,
  };
};

export default connect(mapStateToProps, { fetchSearchTerm, setPageRed })(SearchPage);
