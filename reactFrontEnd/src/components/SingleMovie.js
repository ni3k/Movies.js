import React from 'react';
import { connect } from 'react-redux';
import {
  Embed, Container, Message, Label, Rating, Grid, Header, Icon, Button,
} from 'semantic-ui-react';
import Carousel from 'semantic-ui-carousel-react';
import _ from 'lodash';
import {
  itemFetch, randomItemsFetch, saveItem, clearItem, checkElibility, toogleButton,
} from '../actions/items';
import MovieCard from './MovieCard';
import Loading from './Loading';

//  1ex5mfpsklibrz1rffy0irtubby51f
class SingleMovie extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }, clearingPrev } = this.props;
    clearingPrev();
    this.triggerElements(id);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: currentId } }, clearingPrev } = this.props;
    const { match: { params: { id: prevId } } } = prevProps;
    if (currentId !== prevId) {
      clearingPrev();
      this.triggerElements(currentId);
    }
  }

  handleSave = () => {
    const {
      handleSaveItem,
      toggleSeenButton,
      seenButton,
      currentItem: {
        id,
      },
    } = this.props;
    toggleSeenButton(!seenButton);
    handleSaveItem(id);
  }

  async triggerElements(id) {
    const {
      fetchData, fetchRandomItems, getButtonState,
    } = this.props;
    getButtonState(id);
    fetchRandomItems(5);
    await fetchData(id);
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


  renderButtonSaveLater() {
    const { auth, seenButton } = this.props;
    if (auth) {
      return (
        <Button
          animated="arrow right"
          floated="right"
          size="mini"
          color="blue"
          style={{ marginTop: 5 }}
          onClick={this.handleSave}
        >
          <Button.Content visible>
            {seenButton ? 'Remove from my list' : 'Watch Later'}
          </Button.Content>
          <Button.Content hidden>
            <Icon name="save outline" />
          </Button.Content>
        </Button>
      );
    }
    return (<> </>);
  }

  render() {
    const { hasErrored, isLoading, item } = this.props;
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading || item.rating === undefined || item.genres.length === 0) {
      return <Loading />;
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
                {this.renderButtonSaveLater()}
                <br />
                <br />
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


const mapStateToProps = state => ({
  item: state.selectedItem,
  hasErrored: state.itemsHasErrored,
  isLoading: state.itemsIsLoading,
  genres: state.itemGenres,
  randomItems: state.randomItems,
  auth: state.auth,
  currentItem: state.selectedItem,
  seenButton: state.seenButton,
});

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(itemFetch(id)),
  fetchRandomItems: nr => dispatch(randomItemsFetch(nr)),
  handleSaveItem: id => dispatch(saveItem(id)),
  clearingPrev: () => dispatch(clearItem()),
  getButtonState: id => dispatch(checkElibility(id)),
  toggleSeenButton: boolval => dispatch(toogleButton(boolval)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
