import React, { Component } from 'react';
import AsyncLoadHelper from '../AsyncLoadHelper'
import logo from '../logo.svg';
import './About.css';

const Banner = AsyncLoadHelper(() => import('./Banner'))
class About extends Component {
  render() {
    return (
      <div className="About">
        <img src={logo} alt="" />
        <Banner banner="yyyyyy" />
        About me
      </div>
    );
  }
}

export default About;
