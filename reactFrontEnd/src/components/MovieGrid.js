import React from 'react';
import {
  Grid, Container, Header, Divider, Segment,
} from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Transition } from 'react-spring/renderprops';
import { setPageRed, selectMovie } from '../actions/items';
import Loading from './Loading';
import MovieCard from './MovieCard';

class MovieGrid extends React.Component {
  renderMovies() {
    const { items, handeClick } = this.props;
    const allItems = _.values(items);
    if (allItems.length === 0) {
      return <Header inverted style={{ padding: '30%', paddingBottom: '100vh' }}> There are not currently any movies in this page </Header>;
    }
    return (
      <Transition
        items={allItems}
        keys={item => item.id}
        from={{
          transform: 'translate3d(0,-40px,0)', marginTop: '-50px', marginLeft: '-50px', opacity: 0,
        }}
        enter={{
          transform: 'translate3d(0,0px,0)', marginTop: '0px', marginLeft: '0px', opacity: 1,
        }}
        leave={{ transform: 'translate3d(0,-40px,0)' }}
        config={{ duration: 1000 }}
      >
        {item => (props) => {
          const description = item.description || 'no description';
          return (
            <Grid.Column
              style={props}
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
        }
        }
      </Transition>
    );
  }

  render() {
    const {
      hasErrored, isLoading, children, title,
    } = this.props;


    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Segment inverted>
        <Container textAlign="center">
          <Header size="huge" inverted>
            { title }
          </Header>
          <Divider />
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

const mapStateToProps = state => ({
  items: state.items,
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading,
  setedPage: state.setedPage,
});

const mapDispatchToProps = dispatch => ({
  handeClick: id => dispatch(selectMovie(id)),
  setPage: page => dispatch(setPageRed(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGrid);
