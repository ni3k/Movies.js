import React, { Component } from 'react';
import {
  Menu, Segment, Input,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchTerm } from '../actions/items';

class MenuHead extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
  }

  renderSearchButton = () => (
    <Link to="/search" className="ui button" role="search button">
        Search
    </Link>
  )

  renderLogin = () => {
    console.log(localStorage.getItem('auth'));
    const { activeItem } = this.state;
    if (localStorage.getItem('auth') === 'true') {
      return (
        <Menu.Menu>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={(e, obj) => { this.handleItemClick(e, obj); this.handleLogout(); }}
          />
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu>
        <Link to="/login">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          />
        </Link>
      </Menu.Menu>
    );
  }

  renderMyMovies = () => {
    const { activeItem } = this.state;
    if (localStorage.getItem('auth') === 'true') {
      return (
        <Link to="/movies">
          <Menu.Item
            name="movies"
            active={activeItem === 'movies'}
            onClick={this.handleItemClick}
          >
              My movies
          </Menu.Item>
        </Link>
      );
    }
    return (<></>);
  }

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
          {this.renderMyMovies()}
          <Link to="/account">
            <Menu.Item
              name="Account"
              active={activeItem === 'Account'}
              onClick={this.handleItemClick}
            />
          </Link>
          <Menu.Menu position="right">
            <Input
              placeholder="Search..."
              action={this.renderSearchButton()}
              onChange={(e, { value }) => {
                const { setSearchTerm: searchTerm } = this.props;
                searchTerm(value);
              }}
            />
          </Menu.Menu>
          {this.renderLogin()}
        </Menu>
      </Segment>
    );
  }
}

export default connect(null, { setSearchTerm })(MenuHead);
