import React, { Component } from 'react';
import {
  Menu, Segment, Input,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MenuHead extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSearchClick = (e, { value }) => console.log(value);

  renderSearchButton = () => (
    <Link to="/search" className="ui button" role="search button">
        Search
    </Link>
  )

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
            <Input placeholder="Search..." action={this.renderSearchButton()} onChange={(e, { val }) => { console.log(e); console.log(val); }} />
          </Menu.Menu>
          <Menu.Menu>
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

export default MenuHead;
