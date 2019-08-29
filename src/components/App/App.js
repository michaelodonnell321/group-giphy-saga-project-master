import React, { Component } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Favorites from '../Favorites/Favorites'


class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/favorites' component={Favorites} />
      </div>
      </Router>
    );
  }
  
}

export default App;
