import React  from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Cart from './Cart';
import Login from './Login';
import Header from './Header';
import Register from './Register';
import PasswordChange from './PasswordChange';
import Payment from './Payment'

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />  
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/passwordChange" element={<PasswordChange/>} />
            <Route path="/payment" element={<Payment/>} />
          </Routes>
        </BrowserRouter>

    </React.Fragment>
  );
}

export default App;
