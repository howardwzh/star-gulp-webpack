import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom'
import AsyncLoadHelper from './AsyncLoadHelper';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Home = AsyncLoadHelper(() => import('./components/Home'));
const About = AsyncLoadHelper(() => import('./components/About'));

ReactDOM.render((
  <Router>
    <App>
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </App>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
