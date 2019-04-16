import React from 'react';
import { connect } from 'react-redux';
import {
  Embed, Container, Message, Label, Rating, Grid, Header, Icon,
} from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';
import _ from 'lodash';
import { itemFetch, itemFetchGenres, randomItemsFetch } from '../actions/items';
import MovieCard from './MovieCard';

//  1ex5mfpsklibrz1rffy0irtubby51f
class SingleMovie extends React.Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.triggerElements(id);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: currentId } } } = this.props;
    const { match: { params: { id: prevId } } } = prevProps;
    if (currentId !== prevId) {
      this.triggerElements(currentId);
    }
  }

  triggerElements(id) {
    const { fetchData, fetchGenres, fetchRandomItems } = this.props;
    fetchData(id);
    fetchGenres(id);
    fetchRandomItems(5);
  }

  renderCarousel() {
    //  title, description, rating, genres, poster, id,
    const { randomItems } = this.props;
    const renderedItems = _.mapValues(randomItems, (item) => {
      const {
        title, rating, genres, poster, id,
      } = item;
      return {
        render: () => (
          <div key={id}>
            <MovieCard
              title={title}
              rating={rating}
              genres={genres}
              poster={poster}
              id={id}
            />
            <br />
          </div>
        ),
      };
    });
    return _.values(renderedItems);
  }

  renderLabels() {
    const { genres } = this.props;
    return genres.map(genre => (
      <Label as="a" pointing basic key={genre.id}>
        {genre.title}
      </Label>
    ));
  }

  render() {
    const { hasErrored, isLoading, item } = this.props;
    console.log(item.rating);
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Container style={{ height: '100vh' }}>
        <br />
        <Grid>
          <Grid.Row>
            <Grid.Column computer={12} mobile={16}>
              <Message info>
                <Message.Header>
                  {item.title}
                </Message.Header>
                <p>
                  {item.description}
                </p>

                <Embed
                  icon="right circle arrow"
                  placeholder="/images/image-16by9.png"
                  url={`https://videospider.stream/getvideo?key=gIBI3N1PHUQ0H9mB&video_id=${item.imdbID}&ticket=${item.Ticket}`}
                />
                {this.renderLabels()}
                <Rating icon="heart" disabled defaultRating={item.rating} maxRating={10} />
              </Message>
            </Grid.Column>
            <Grid.Column width={4} only="computer">
              <Header inverted>
                <Icon name="hand point down outline" />
                <Header.Content>Other Movies that you can enjoy here</Header.Content>
                <Icon name="hand point down outline" />
              </Header>
              <Carousel
                elements={this.renderCarousel()}
                duration={3000}
                animation="slide left"
                showNextPrev
                showIndicators

              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state);
  return {
    item: state.selectedItem,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    genres: state.itemGenres,
    randomItems: state.randomItems,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(itemFetch(id)),
  fetchGenres: id => dispatch(itemFetchGenres(id)),
  fetchRandomItems: nr => dispatch(randomItemsFetch(nr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
