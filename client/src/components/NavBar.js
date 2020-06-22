import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleAlt,
  faUsers,
  faPeopleArrows,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import "./navbar.scss";
const GET_ME = gql`
  {
    me {
      id
      name
    }
  }
`;

const NavBar = () => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const userName = data.me ? data.me.name : "John Doe";
  console.log(data);
  return (
    <nav id="navbar">
      <div id="image-holder">
        <Link to="profile/{userId}">
          <img id="nav-profile-pic" />
        </Link>
        <span className="username-span">{userName}</span>
      </div>
      <div id="menu-holder">
        <ul className="nav-links">
          <Link to="/">
            <FontAwesomeIcon icon={faHouseUser} />
          </Link>
          <Link to="/connections">
            <FontAwesomeIcon icon={faPeopleArrows} />
          </Link>
          <Link to="/notifications">
            <FontAwesomeIcon icon={faAppleAlt} />
          </Link>
          <Link to="/groups">
            <FontAwesomeIcon icon={faUsers} />
          </Link>
        </ul>
        <input className="menu searchbar" type="search" placeholder="search" />
      </div>
    </nav>
  );
};

export default NavBar;
