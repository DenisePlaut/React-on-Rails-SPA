import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap'
import AuthService from '../../services/AuthService'

const Auth = new AuthService()

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      loginSuccess: false
    }
  }

  handleChange(event){
    let login = this.state
    login[event.target.name] = event.target.value
    this.setState({ login })
  }

  handleSubmit(event){
    event.preventDefault()
    Auth.login(this.state.email, this.state.password)
      .then (successUser => {
        console.log("Login Success", successUser);
        this.setState({loginSuccess: true})
      })
      .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div className="center">
        <h2>
          Login
        </h2>
        <br />
        <Form className="login-form">
          <FormControl
            className="login-form-control"
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange.bind(this)}
            value={this.state.email}
          />
          <FormControl
            className="login-form-control"
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.handleChange.bind(this)}
            value={this.state.password}
          />
          <br />
          <Button
            variant="dark"
            type="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </Form>
        {this.state.loginSuccess && <Redirect to="/welcome" />}
        <small className="text-muted">
          Don't have an account?&nbsp;
          <NavLink to="/signup" as="span">
            Sign up
          </NavLink>
        </small>
      </div>
    )
  }
}

export default Login
