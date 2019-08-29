import React, { Component } from 'react';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites'


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Home />
        <Favorites />
      </div>
    );
  }
  
}

export default App;
