// Payment.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  
  function isValidCard(number) {
    // Check card number length
    if(number.length < 16 || number.length > 16) {
      return false;
    }
  
    // Check if only contains digits
    if(!/^\d+$/.test(number)) {
      return false; 
    }
  
    return true;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if(!isValidCard(cardNumber)) {
      alert('Invalid card number');
      return;
    }
    alert("Payment Successful!")
    // Call API to process payment
    navigate("/")

  }

  // Card input change handlers
  // ...

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h4>Order Total: {location.state.totalPrice}</h4>
      <div className="form-group">
        <label>Card Number</label>
        <input 
          className="form-control"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)} 
        />
      </div>
      <div className="form-group">
      <label>Expiration Date</label>
        <input
          className="form-control"
          type="text" 
          value={expDate}
          onChange={(e) => setExpDate(e.target.value)}  
        /> 
        </div>
      <div className="form-group">
        <label>CVC</label>
        <input
          className="form-control"
          type="text"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>  

      <button type="submit">Pay</button>
    </form>
  )

}