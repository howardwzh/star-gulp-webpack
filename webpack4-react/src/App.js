import React, { Component } from 'react';
import _chunk from 'lodash/chunk'
import './App.css';

class App extends Component {
  render() {
    const chunk = _chunk(['a', 'b', 'c', 'd'], 2);
    // console.log(chunk)
    return (
      <div className="App">
        { this.props.children }
        {chunk}
      </div>
    );
  }
}

export default App;
