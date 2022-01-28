import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/authContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then((userCredential) => {
        // Signed IN

        //Navigate to Dashboard once the login is successful
        navigate('/dashboard/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <Box className="login">
      {/* Left Image  */}
      <Box className="left-container"></Box>

      {/* Right Container: LOGIN FORM */}
      <Box className="right-container">
        <Box className="logo-container">
          <img className="logo" src="images/logo.png" alt="company logo" />
        </Box>
        <h1 className="page-title">Resolute AI Ticketing System</h1>
        <h2 className="form-heading">Enter your details to login</h2>

        {/* FORM */}
        <form className="login-form" onSubmit={handleLogin}>
          <TextField
            sx={{ width: '400px' }}
            label="Email Address"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: '400px' }}
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color="primary"
            sx={{
              height: '40px',
            }}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
