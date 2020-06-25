import React, { Component } from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap'
import AuthService from '../../services/AuthService'

const Auth = new AuthService()

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        last_login: ""
      },
      createSuccess: false
    }
  }

  handleChange(event) {
    let { user } = this.state
    user[event.target.name] = event.target.value
    this.setState({user: user})
  }

  handleSubmit(event) {
    event.preventDefault()
    Auth.signup(this.state.user)
      .then (successUser => {
        console.log("Sign Up Success", successUser); this.setState({createSuccess: true})
      })
    .catch(err =>{ alert(err) })
  }

  render() {
    return (
      <div className="center">
        <h2>
          Sign Up
        </h2>
        <br />
        <Form className="signup-form">
          <FormControl
            className="signup-form-control"
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl
            className="signup-form-control"
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl
            className="signup-form-control"
            type="password"
            name="password"
            placeholder="Password (min. 8 characters)"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl
            className="signup-form-control"
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            onChange={this.handleChange.bind(this)}
          /><br/>
          <Button
            variant="dark"
            type="submit"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit
          </Button>
        </Form>
        {this.state.createSuccess && <Redirect to="/welcome" />}
        <small className="text-muted">
          Already have an account?&nbsp;
          <NavLink to="/login" as="span">
            Login
          </NavLink>
        </small>
      </div>
    )
  }
}

export default SignUp
