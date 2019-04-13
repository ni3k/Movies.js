/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Popup, Card, Rating, Image } from "semantic-ui-react";

const MovieCard = ({ title, description, rating, genres, poster }) => {
  return (
    <div>
      <Popup
        trigger={
          <Card style={{ height: 350 }}>
            <Image
              size="medium"
              fluid
              style={{
                maxHeight: 250,
                backgroundImage:
                  "https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg"
              }}
              src={
                poster === "N/A"
                  ? "https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg"
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
        }
      >
        <Popup.Header>User Rating</Popup.Header>
        <Popup.Content>
          <Rating icon="star" defaultRating={rating} maxRating={10} />
        </Popup.Content>
      </Popup>
    </div>
  );
};

export default MovieCard;
