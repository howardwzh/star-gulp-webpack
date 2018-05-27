
import React, { Component } from 'react';
import AsyncLoadHelper from '../AsyncLoadHelper'
import logo from '../logo.svg';
import './Home.css';

const Banner = AsyncLoadHelper(() => import('./Banner'))

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <img src={logo} alt="" />
        <Banner banner="xxxxxx" />
        Home
      </div>
    );
  }
}

export default Home;
