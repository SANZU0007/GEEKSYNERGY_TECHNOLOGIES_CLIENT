import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import '../css/Login.css'; // Ensure you have this file for custom CSS
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = 'https://geeksynergy-technologies-server.onrender.com/login';

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) errors.password = 'Password is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Set loading to true when starting the API call

    try {
      const response = await axios.post(API_URL, formData);
      setNotification({ message: 'Login successful', type: 'success' });
      console.log('Login successful:', response.data);
      navigate('/home');
      // Redirect user or handle successful login actions
    } catch (error) {
      console.error('There was an error logging in:', error);
      setNotification({ message: 'Login failed. Please try again.', type: 'danger' });
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Login</h1>

          {notification.message && (
            <Alert variant={notification.type}>
              {notification.message}
            </Alert>
          )}

          <Form className='borderclass' onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group  controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                isInvalid={!!formErrors.password}
              />
              <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="mt-3 w-100"
              disabled={loading} // Disable the button when loading
            >
              {loading ? 'Logging in...' : 'Submit Login'}
            </Button>

            <br /><br />
            <p>Create a new account? <a href="/Register">Register here</a></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
