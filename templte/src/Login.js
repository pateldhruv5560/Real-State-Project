import React, { useState } from 'react';
import { Tab, Tabs, Container, Form, Button } from 'react-bootstrap';
import './Login.css'; // Import the external CSS file
import { json, useNavigate } from 'react-router-dom';
import { header } from 'framer-motion/client';

function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const nav = useNavigate();

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const handleChange = (e) => {
    // e.preventDefault();
    const Data = { name, password, email };  

    fetch('http://localhost:3006/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Registration successful: ');
      })



  };

  const handlelogin = (e) => {
    e.preventDefault();

    // Check for admin credentials
  if (email === 'admin@123' && password === 'admin123') {
    alert('Admin Login Successful!');
    localStorage.setItem('user', JSON.stringify({ email, role: 'admin' }));
    nav('/admin'); // Redirect to admin page
    return;
  }

    fetch('http://localhost:3006/user')
    .then((response) => response.json())
      .then((Data) => {
        console.log(Data)
        // Find if the user exists with matching email and password
        const user = Data.find(
          (user) => user.email === email && user.password === password
        );

        

        if (user) {
          alert('Login successful! Welcome, ' + user.name);
          localStorage.setItem('user',JSON.stringify(user))
          // console.log(user)
          nav('/welcome');
      
        } else {
          alert('Invalid credentials. Please try again.');
        }
      })
   
  };

  return (
    <Container id="logcontainer" className="container mt-5" >
      <Tabs
        id="auth-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          {/* Login Form */}
          <Form className="tab-content" onSubmit={handlelogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter E-Mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          {/* Register Form */}
          <Form className="tab-content" onSubmit={handleChange}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>your address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I agree to the terms and conditions" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Login;
