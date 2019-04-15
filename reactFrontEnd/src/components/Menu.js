import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Link to="/">
            <Menu.Item
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/movies">
            <Menu.Item
              name="movies"
              active={activeItem === 'movies'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/account">
            <Menu.Item
              name="Account"
              active={activeItem === 'Account'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
