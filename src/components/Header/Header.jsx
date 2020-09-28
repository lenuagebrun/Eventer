import React from 'react';

const Header = (props) => (
  <div>
    <header className="App-header">
      <p id='title'>E  V  E  N  T  E  R</p>
      <nav>
        <ul id='nav-list'>
          <li><a href='/'>LOG IN</a></li>
          <li><a href='/'>ABOUT</a></li>
        </ul>
      </nav>
    </header>
  </div>
)

export default Header;