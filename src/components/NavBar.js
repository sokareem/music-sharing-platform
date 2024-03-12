import React from 'react';
import HomePage from './HomePage';
// import { useAuth } from 'music-sharing-platform/src/context/AuthContext.js';

function NavBar() {

  return (
    <nav className="navbar">
      <div className="logo">MusicShare</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/upload">Upload Track</a></li>
        <li><a href="/insights">Insights</a></li>
        {/* Conditional rendering based on authentication state */}
        {/* {user ? (
          <li><button onClick={logout}>Logout</button></li>
        ) : (
          <li><a href="/login">Login</a></li>
        )} */}
      </ul>
    </nav>
  );
}

export default NavBar;
