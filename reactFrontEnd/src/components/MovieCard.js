import React from 'react';
import {
  Popup, Card, Rating, Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MovieCard = ({
  title, description, rating, genres, poster, id,
}) => (
  <Link to={`/movie/${id}`}>
    <Popup
      trigger={(
        <Card style={{ height: 350 }} inverted>
          <Image
            fluid
            style={{
              maxHeight: 250,
              backgroundImage:
                  'https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg',
            }}
            src={
                poster === 'N/A'
                  ? 'https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg'
                  : poster
              }
          />
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Description>
              {description}
              {genres}
            </Card.Description>
          </Card.Content>
        </Card>
)}
    >
      <Popup.Header>User Rating</Popup.Header>
      <Popup.Content>
        <Rating icon="star" defaultRating={rating} maxRating={10} />
      </Popup.Content>
    </Popup>
  </Link>
);

export default MovieCard;
