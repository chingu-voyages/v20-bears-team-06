import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './navbar.scss';

const NavBar = () => {
  return (
    <nav id="navbar">
      <div id="image-holder">
          <Link to='/{userId}'>
        <img id="nav-profile-pic" />
        </Link>
      </div>
      <div id="menu-holder">
          <ul className='nav-links'>
              <Link to='/'>home</Link>
              <Link to='/connections'>connections</Link>
              <Link to='/notifications'>notifications</Link>
              <Link to='/groups'>groups</Link>

          </ul>
          <input className='menu searchbar' type='search' placeholder='search' /> 

      </div>
    </nav>
  );
};


export default NavBar;
