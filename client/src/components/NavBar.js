import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAppleAlt, faUsers, faPeopleArrows, faHouseUser} from '@fortawesome/free-solid-svg-icons';

import './navbar.scss';

const NavBar = () => {
  return (
    <nav id="navbar">
      <div id="image-holder">
          <Link to='profile/{userId}'>
        <img id="nav-profile-pic" />
        </Link>
        <span className='username-span'>John Doe</span>
      </div>
      <div id="menu-holder">
          <ul className='nav-links'>
              <Link to='/'><FontAwesomeIcon icon={faHouseUser}/></Link>
              <Link to='/connections'><FontAwesomeIcon icon={faPeopleArrows}/></Link>
              <Link to='/notifications'><FontAwesomeIcon icon={faAppleAlt} /></Link>
              <Link to='/groups'><FontAwesomeIcon icon={faUsers}/></Link>

          </ul>
          <input className='menu searchbar' type='search' placeholder='search' /> 

      </div>
    </nav>
  );
};


export default NavBar;
