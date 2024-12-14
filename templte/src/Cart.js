import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext'; // Import context
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Initialize count to 1 for each item
  const [count, setCount] = useState(1);

  // Increment and Decrement functions for quantity
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1); // Prevent count from going below 1
    }
  };

  // Function to calculate the total price for this item
  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  const handlePayment = () => {
    navigate('/Payment'); // Redirect to the payment page
  };

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ccc',
                margin: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={window.location.origin + '/' + item.imgSrc}
                alt={item.category}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
              <div>
                <h2>{item.category}</h2>
                <p>Price: ₹{item.price}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={decrement}>-</button>

                  <input
                    type="number"
                    value={count}
                    readOnly
                    style={{ width: '50px', textAlign: 'center' }}
                  />

                  <button onClick={increment}>+</button>
                </div>
                {/* <p>
                  Total for this item: ₹{calculateTotal(item.price, count)}
                </p> */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: 'red', marginTop: '10px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}></div>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handlePayment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
