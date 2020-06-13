import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProfilePage from './pages/ProfilePage';

import './App.scss';

function App() {
  return (
    <div id="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={null} />
        <Route path="/profile/:userid" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
