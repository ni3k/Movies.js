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
    return (
      <Transition
        items={allItems}
        keys={item => item.id}
        from={{ transform: 'translate3d(0,-40px,0)' }}
        enter={{ transform: 'translate3d(0,0px,0)' }}
        leave={{ transform: 'translate3d(0,-40px,0)' }}
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
      hasErrored, isLoading, items, children, title,
    } = this.props;
    if (items.length === 0) { return <Loading />; }
    console.log(items);

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
