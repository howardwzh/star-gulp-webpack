import React, { Component } from 'react';
import logo from '../logo.svg';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="About">
        <img src={logo} alt="" />
        About
      </div>
    );
  }
}

export default About;
