import React, { Component } from 'react'
import pups_about from '../../assets/images/pups-about.png'

class About extends Component {
  render() {
    return (
      <div className="center">
        <h2>
          About
        </h2>
        <h4>
          Fancy meeting you here!
        </h4>
        <br />
        <img
          className="image-md"
          src={pups_about}
          alt="Two dogs at a park"
        />
      </div>
    )
  }
}

export default About
