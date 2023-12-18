import React  from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Cart from './Cart';
import AuthForm from './AuthForm';
import Header from './Header';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />  
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<AuthForm />} />
          </Routes>
        </BrowserRouter>

    </React.Fragment>
  );
}

export default App;
