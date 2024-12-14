import React from 'react';
import { useCart } from './CartContext';

const Product = ({ product }) => {
    const { add } = useCart();

    const handleAddToCart = () => {
        add({ ...product, quantity: 1 });
    };

    return (
        <div>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Product;
