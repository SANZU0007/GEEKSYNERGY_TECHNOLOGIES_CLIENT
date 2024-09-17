import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; // Ensure this file is included in your project

const Registers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    profession: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = 'https://geeksynergy-technologies-server.onrender.com/register';
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.phoneNo) {
      errors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      errors.phoneNo = 'Phone number must be 10 digits';
    }
    if (!formData.profession) errors.profession = 'Profession is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Set loading to true

    try {
      const response = await axios.post(API_URL, formData);
      setNotification({ message: 'User registered successfully', type: 'success' });
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('There was an error registering:', error);
      setNotification({ message: 'Registration failed. Please try again.', type: 'danger' });
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Register</h1>

          {notification.message && (
            <Alert variant={notification.type}>
              {notification.message}
            </Alert>
          )}

          <Form className='borderclass' onSubmit={handleRegister}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
            </Form.Group>

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

            <Form.Group controlId="formPassword">
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

            <Form.Group controlId="formPhoneNo">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Enter your phone number"
                isInvalid={!!formErrors.phoneNo}
              />
              <Form.Control.Feedback type="invalid">{formErrors.phoneNo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formProfession">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Enter your profession"
                isInvalid={!!formErrors.profession}
              />
              <Form.Control.Feedback type="invalid">{formErrors.profession}</Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="mt-3 w-100"
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'Submitting...' : 'Submit Registration'}
            </Button>

            <br />
            <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registers;
