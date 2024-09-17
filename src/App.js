import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registers from './Users/Registers';
import Login from './Users/Login';
import HomePage from './Components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the registration page */}
        <Route path="/register" element={<Registers />} />
        
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<HomePage />} />

        {/* Optional: Redirect to /login if no route matches */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
