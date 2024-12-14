import './App.css';
import React, { useState } from 'react';
import Home from './Home';
import Header from './Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Footer from "./Footer";
import Properties from './Properties';
import Properties_details from './Properties_details';
import Contacts from './Contacts';
import Login from './Login';
import Profile from './Profile';
import Viewuser from './Viewuser'; 
import AdminPanel from './AdminPanel'; 
import Admin_pannel_Edit from './Admin_pannel_Edit'; 
import Add_to_card from './Add_to_card';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import Payment from './Payment';
import Add_Admin from './Add_Admin';


// Separate component to handle routing and footer conditionally
function MainApp() {

  const location = useLocation(); // Access current route path

  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname === '/admin';
  const isAdminEditPage = location.pathname === '/adminedit';
  
  return (
    <>
      {!isAdminPage && !isAdminEditPage &&  <Header />}
   

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Properties" element={<Properties />} />
        <Route path="/Properties_details" element={<Properties_details />} />
        <Route path='/viewuser/:detail' element={<Viewuser />} /> {/* Corrected dynamic route */}
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Profile />} />

        <Route path='/add/:detail' element={<Add_to_card/>}/>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/edit/:detail" element={<Admin_pannel_Edit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />

        <Route path="/Admin_add" element={<Add_Admin />} />
      </Routes>

  {/* Conditionally render Footer: Do not show on login or admin pages */}
  {!isAdminPage && !isAdminEditPage && !isLoginPage && <Footer />}

    </>
  );
}

function App() {



  return (
    
    <div className="App">

      <CartProvider>
      <BrowserRouter>
        <MainApp/>
      </BrowserRouter>
      </CartProvider>
      
    </div>
  );
}

export default App;
