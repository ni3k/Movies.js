import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import {
  Pagination,
  Container,
  Header,
} from 'semantic-ui-react';
import {
  itemsFetchData,
  setPageRed,
  fetchGenres,
} from '../actions/items';
import MovieGrid from './MovieGrid';
import FilterGenres from './FilterGenres';
import Loading from './Loading';

class PageMovies extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: {
          page,
        },
      },
    } = this.props;
    this.triggerElements(page);
  }

  onPageChange = (e, {
    activePage,
  }) => {
    const {
      history,
      baseUrl,
    } = this.props;
    history.push(`${baseUrl}/${activePage}`);
    this.triggerElements(activePage);
  }

  triggerElements = (page) => {
    const {
      fetchData,
      setPage,
      fetchFilter,
      filters,
      filterLink,
      commonLink,
    } = this.props;
    const filterString = filters.join(',');
    setPage(page);
    fetchFilter();
    if (filters.length === 0) {
      fetchData(`/${commonLink}?page=${page}&limit=16`);
    } else {
      fetchData(`/${filterLink}?genres=${filterString}&page=${page}&limit=16`);
    }
  }

  renderFilter() {
    const { filterLink } = this.props;
    if (filterLink) {
      return (
        <FilterGenres onChangeHappened={() => this.onPageChange(null, { activePage: 1 })
        }
        />
      );
    }
    return (<></>);
  }

  render() {
    const {
      hasErrored,
      isLoading,
      items,
      setedPage,
      pagination,
    } = this.props;
    if (items.length === 0) {
      return <Loading />;
    }

    if (hasErrored) {
      return <p> Sorry!There was an error loading the items </p>;
    }
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Container style={{ minHeight: '100vh' }}>
        {
          this.renderFilter()
        }
        <Header
          inverted
          textAlign="center"
        >
          All Movies
        </Header>
        <MovieGrid>
          <Pagination
            boundaryRange={0}
            ellipsisItem={null}
            defaultActivePage={
        setedPage
      }
            totalPages={
        pagination
      }
            onPageChange={
        this.onPageChange
      }
            inverted
          />
        </MovieGrid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items,
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading,
  setedPage: state.setedPage,
  filters: state.filters,
  pagination: state.pagination,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(itemsFetchData(url)),
  setPage: page => dispatch(setPageRed(page)),
  fetchFilter: () => dispatch(fetchGenres()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageMovies));
