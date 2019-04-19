import React from 'react';
import {
  Container, Segment, Form, Grid, Header, Button, Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '../apiConfig/config';
import { setAuth } from '../actions/items';

class Login extends React.Component {
  state = {
    password: '', email: '', message: '',
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = async (e) => {
    const { email, password } = this.state;
    const { history, setAuth: login } = this.props;
    e.preventDefault();
    const { data: { message, token, auth } } = await api.post('/login', {
      email,
      password,
    });
    if (token !== undefined) {
      localStorage.setItem('token', token);
      localStorage.setItem('auth', auth);
      login(true);
      history.push('/');
    }
    this.setState({ message });
  }

  renderMessage() {
    const { message } = this.state;
    if (message !== '') {
      return (
        <Message>
          {message}
        </Message>
      );
    }
    return (<></>);
  }

  render() {
    const {
      password, email,
    } = this.state;
    return (
      <Segment inverted>
        <Container textAlign="center">
          <div className="login-form">
            <style>
              {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
            </style>
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header inverted as="h2" color="teal" textAlign="center">
                  Log-in to your account
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input onChange={this.handleChange} name="email" value={email} fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                    <Form.Input
                      fluid
                      onChange={this.handleChange}
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      value={password}
                    />

                    <Button color="teal" fluid size="large">
                      Login
                    </Button>
                  </Segment>
                  {this.renderMessage()}
                </Form>
                <Message info>
                  Don&#39;t have an accout?
                  <br />
                  <Link to="/register" as="a">
                  Register now
                  </Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </Segment>
    );
  }
}

export default connect(null, { setAuth })(Login);
