import React, { Component } from 'react';
import {
  Menu, Segment, Input,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchTerm, setAuth } from '../actions/items';

class MenuHead extends Component {
  state = { activeItem: 'home' };

  componentDidMount() {
    const { setAuth: logging } = this.props;
    if (localStorage.getItem('auth') === 'true') {
      logging(true);
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLogout = () => {
    const { setAuth: logging } = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    logging(false);
  }

  renderSearchButton = () => (
    <Link to="/search" className="ui button" role="search button">
        Search
    </Link>
  )

  renderLogin = () => {
    const { auth } = this.props;
    const { activeItem } = this.state;
    if (auth === true) {
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
        <Menu.Item
          as={Link}
          to="/login"
          name="login"
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
        />
      </Menu.Menu>
    );
  }

  renderLoggedInLinks = () => {
    const { activeItem } = this.state;
    const { auth } = this.props;
    if (auth === true) {
      return (
        <>
          <Menu.Item
            as={Link}
            to="/mymovies"
            name="movies"
            active={activeItem === 'movies'}
            onClick={this.handleItemClick}
          >
              My movies
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/account"
            name="Account"
            active={activeItem === 'Account'}
            onClick={this.handleItemClick}
          />
        </>
      );
    }
    return (<></>);
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary stackable>
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          {this.renderLoggedInLinks()}

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

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setSearchTerm, setAuth })(MenuHead);
