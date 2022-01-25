import { Box, Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },

  leftContainer: {
    flexBasis: '60%',
    background: "url('images/login-image.jpg')",
    backgroundSize: 'cover',
    flexShrink: 0,
  },

  rightContainer: {
    textAlign: 'center',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '100px 80px',
  },

  logo: {
    maxWidth: 250,
  },
  title: {
    marginTop: 80,
    marginBottom: 40,
    fontWeight: 500,
  },

  fontSize30: {
    fontSize: 30,
  },

  marginBottom20: {
    marginBottom: 20,
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} component="div">
      {/* Left Container */}
      <div className={classes.leftContainer}></div>

      {/* Right Container */}
      <div className={classes.rightContainer}>
        <div className={classes.logoContainer}>
          <img
            className={classes.logo}
            src="images/logo.png"
            alt="company logo"
          />
        </div>
        <Typography variant="h4" className={classes.title}>
          Resolute AI Ticketing System
        </Typography>

        <form noValidate>
          <Typography
            className={`${classes.fontSize30} ${classes.marginBottom20}`}
          >
            Enter your details to login
          </Typography>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            fullWidth
            className={classes.marginBottom20}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            className={classes.marginBottom20}
          />
          <Button variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
