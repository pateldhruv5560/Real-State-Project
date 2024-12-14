import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './CartContext'; // Import context

function AddToCart() {
  const { detail } = useParams();
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const { addToCart } = useContext(CartContext); // Access addToCart function

  useEffect(() => {
    fetch(`http://localhost:5100/viewuser/${detail}`)
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.price);
        setImgSrc(data.imgSrc);
        setCategory(data.category);
      });
  }, [detail]);

  const handleAddToCart = () => {
    const item = { id: detail, imgSrc, category, price };
    addToCart(item);
  };

  return (
    <div>
      <h1>Property Details</h1>
      <div>
        <h2>ID: {detail}</h2>
        <img 
          src={window.location.origin + '/' + imgSrc}
          alt="Property"
          style={{ width: '400px', height: '300px' }}
          onError={(e) => (e.target.src = '/assets/images/default-image.jpg')}
        />
        <h3>Category: {category}</h3>
        <p style={{ color: 'red', fontSize: '17px', fontFamily: 'monospace' }}>Price: {price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default AddToCart;
