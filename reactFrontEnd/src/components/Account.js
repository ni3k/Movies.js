import React from 'react';
import {
  Container, Segment, Form, Grid, Header, Button, Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import api from '../apiConfig/config';

class Register extends React.Component {
  state = {
    password: '', email: '', firstName: '', lastName: '', message: '',
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { data: { email, firstName, lastName } } = await api.get('/finduser', {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    this.setState({ email, firstName, lastName });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = async (e) => {
    const {
      password, email, firstName, lastName,
    } = this.state;
    e.preventDefault();
    const { data: { message } } = await api.post('/edit', {
      firstName,
      lastName,
      password,
      email,
    });
    this.setState({ message });
    console.log(this.state);
  }

  renderMessage() {
    const { message } = this.state;
    if (message !== '') {
      return (
        <Message>
          { message }
          <br />
          <Link to="/login" as="a">
            Login now
          </Link>
        </Message>
      );
    }
    return (<></>);
  }

  render() {
    const {
      password, email, firstName, lastName,
    } = this.state;
    return (
      <Segment inverted>
        <Container textAlign="center">
          <div className="login-form">
            <style>
              {`
      label {
        float: left;
      }
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
                    Edit your account
                </Header>
                <Form size="large" onSubmit={this.handleSubmit}>
                  <Segment stacked>
                    <Form.Input label="email" onChange={this.handleChange} name="email" value={email} fluid icon="user" iconPosition="left" placeholder="E-mail address" />
                    <Form.Input label="first name" onChange={this.handleChange} name="firstName" value={firstName} fluid icon="user" iconPosition="left" placeholder="First Name" />
                    <Form.Input label="last name" onChange={this.handleChange} name="lastName" value={lastName} fluid icon="user" iconPosition="left" placeholder="Last Name" />
                    {/* <Form.Input
                      fluid
                      onChange={this.handleChange}
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      value={password}
                    /> */}

                    <Button color="teal" fluid size="large">
                      Edit
                    </Button>
                  </Segment>
                </Form>
                {this.renderMessage()}
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </Segment>
    );
  }
}

export default Register;
