import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price;
    }, 0);
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(storedCart);
    setCart(storedCart);
  }, []);

  return (
    <React.Fragment>
        <table>
        <thead>
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {cart.map(item => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td> 
                <td>Rs {item.price}</td>
            </tr>
            ))}
            <tr>
            <td></td>
            <td>Total price</td>
            <td>Rs {totalPrice}</td>
            </tr>
        </tbody>
        </table>
        <div className="checkout-container">
            <button className="checkout-btn" onClick={(e) => {navigate('/payment',{state: {totalPrice: totalPrice}});}}>
            Checkout
            </button>
        </div>

    </React.Fragment>
  
  );

}