// Home.js

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

import './Header.css';

function Header() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="home">
      <header>
        <h1>Vibhav Electronics Mart</h1>

        <nav className={showMenu ? "mobile-menu" : ""}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <FaBars />
          </button>

          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Welcome to Vibhav Electronics Mart!</h2>
        <p>Your one-stop shop for all your needs.</p>
      </main>

    </div>
  );
}

export default Header;