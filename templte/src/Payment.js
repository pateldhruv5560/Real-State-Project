import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate(); // Hook to handle navigation

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value); // Update payment method
  };

  const handleProceedPayment = () => {
    if (paymentMethod) {
      alert(`Proceeding with ${paymentMethod} payment`);
      navigate('/'); // Redirect to home page after payment
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <div>
      <h1>Payment</h1>

      {/* Payment Method Options */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Select Payment Method</h2>
        <div>
          <label>
            <input
              type="radio"
              value="googlePay"
              checked={paymentMethod === 'googlePay'}
              onChange={handlePaymentChange}
            />
            Google Pay
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentChange}
            />
            Credit/Debit Card
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentChange}
            />
            Cash on Delivery (COD)
          </label>
        </div>
      </div>

      {/* Display Payment Method Chosen */}
      {paymentMethod && (
        <div style={{ marginTop: '20px' }}>
          <h3>You have selected: {paymentMethod}</h3>
          {paymentMethod === 'googlePay' && <p>Proceed with Google Pay</p>}
          {paymentMethod === 'card' && <p>Enter your card details</p>}
          {paymentMethod === 'cod' && <p>Cash on Delivery selected. Pay when you receive your order.</p>}
        </div>
      )}

      {/* Proceed button */}
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleProceedPayment} // Call the function when clicked
        >
          Proceed with Payment
        </button>
      </div>
    </div>
  );
}

export default Payment;
