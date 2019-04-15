import React from 'react';
import { connect } from 'react-redux';
import {
  Embed, Container, Message, Label, Rating,
} from 'semantic-ui-react';
import { itemFetch, itemFetchGenres } from '../actions/items';
//  1ex5mfpsklibrz1rffy0irtubby51f
class SingleMovie extends React.Component {
  componentDidMount() {
    const { match: { params: { id } }, fetchData, fetchGenres } = this.props;
    fetchData(id);
    fetchGenres(id);
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
    console.log(parseInt(item.rating, 10));
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (isLoading) {
      return <p>Loading…</p>;
    }

    return (
      <Container style={{ height: '100vh' }}>
        <br />
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
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(itemFetch(id)),
  fetchGenres: id => dispatch(itemFetchGenres(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
