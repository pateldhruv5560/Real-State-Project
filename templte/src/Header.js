import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext'; // Access cart context

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const { cartItems } = useContext(CartContext); // Access cart context

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLogin(!!user);
  }, []);

  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="index.html" className="logo">
                <h1>Villa</h1>
              </a>
              {!isLogin ? (
                <Link to="/login" className="log_in">Login</Link>
              ) : (
                <Link to="/welcome" className="log_in">Profile</Link>
              )}
              <ul className="nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Properties">Properties</Link></li>
                <li><Link to="/Properties_details">Property Details</Link></li>
                <li><Link to="/contacts">Contact Us</Link></li>
                <li>
                  <Link to="/cart">
                    <i className="fa fa-shopping-cart"></i> Cart ({cartItems.length})
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
