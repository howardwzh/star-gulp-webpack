import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import LoadableHelper from './LoadableHelper';
import App from './App';
// import Home from './components/Home';
// import About from './components/About';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Home = LoadableHelper('./components/Home');
const About = LoadableHelper('./components/About');

ReactDOM.render((
  <Router>
    <App>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </App>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
