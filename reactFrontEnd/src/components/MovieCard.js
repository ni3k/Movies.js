import React from 'react';
import {
  Popup, Card, Rating, Image, Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const renderImage = (poster) => {
  if (poster === null || poster === 'N/A') { return <Label content="Image not found!" icon="warning" />; }
  return (
    <Image
      fluid
      style={{
        maxHeight: 250,
        backgroundImage:
        'https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg',
      }}
      src={
      poster
    }
    />
  );
};

const MovieCard = ({
  title, description, rating, genres, poster, id,
}) => (

  <Popup
    as={Link}
    to={`/movie/${id}`}
    trigger={(
      <Card
        style={{ heightMax: 350 }}
        inverted="true"
        as={Link}
        to={`/movie/${id}`}
      >
        { renderImage(poster) }
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            {genres}
          </Card.Description>
        </Card.Content>
      </Card>
)}
  >
    <Popup.Header>User Rating</Popup.Header>
    <Popup.Content>
      <Rating icon="star" defaultRating={rating} maxRating={10} />
      <br />
      {description}
    </Popup.Content>
  </Popup>

);

export default MovieCard;
