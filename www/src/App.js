import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import logo from './dvm.jpg';
import './App.css';

import N00bs from './components/N00bs.react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">N00b Portal</h1>
        </header>
        <p className="App-intro">
          <Router>
            <Switch>
              <Route exact={true} path="/" component={N00bs}/>
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        </p>
      </div>
    );
  }
}

export default App;
