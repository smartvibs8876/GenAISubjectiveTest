// Home.js

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { toggle } from './redux/actions';

async function passwordChange(e) {
  let email = prompt("Please enter your email", "");
  if(email === null || email === "") {
    return
  }
  const response = await fetch('http://localhost:3000/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email}) 
  });
  if (response.ok) {
    alert("Password sent to your registered mail")
  }else {
    alert("Oops something went wrong")
  }
}

function Header() {

  const [showMenu, setShowMenu] = useState(false);
  const loggedIn = useSelector(state => state.loggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="home">
      <header>
        <h1>Vibhav Electronics Mart</h1>

        <nav className={showMenu ? "mobile-menu" : ""}>
          <button onClick={() => setShowMenu(!showMenu)}>
            <FaBars />
          </button>

          <ul>
            <li><a onClick={()=>{navigate("/")}}>Home</a></li>
            {
              loggedIn ?
              <React.Fragment>
                <li><a onClick={()=>{navigate("/products")}}>Products</a></li>
                <li><a onClick={()=>{navigate("/cart")}}>Cart</a></li>
                <li><a onClick={()=>{dispatch(toggle());navigate("/")}}>Logout</a></li>
              </React.Fragment> 
              :<React.Fragment>
                <li><a onClick={()=>{navigate("/login")}}>Login</a></li>
                <li><a onClick={()=>{navigate("/register")}}>Register</a></li>
                <li><a onClick={()=>{passwordChange()}}>Forgot Password</a></li>
              </React.Fragment>
            }

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