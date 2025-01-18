import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Button, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
const verifyOtp = () => {
  const location=useLocation();
  const {email}=location.state||{};
  const [otp, setOtp] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate=useNavigate();
  const handleChange = (newValue) => {
    setOtp(newValue);
    setError(''); // Clear error when user types
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      // Perform OTP validation or submission logic here
      console.log('OTP submitted:', otp);
      setError('');
    } else {
      setError('Please enter a valid 6-digit OTP.');
    }
    let data = JSON.stringify({
      "email": email,
      "otp": otp,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8267/auth/verify-otp?',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div className='flex justify-center items-center h-[85vh]'>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        gap: 2,
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Enter OTP
      </Typography>
      <Typography>
        OTP sent to {email}
      </Typography>
      <MuiOtpInput
        value={otp}
        onChange={handleChange}
        length={6} // Set the OTP length to 6
        autoFocus // Automatically focus the first input
        validateChar={(char) => /^\d+$/.test(char)} // Only allow numeric input
        sx={{ gap: 1 }} // Customize the spacing between inputs
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={otp.length !== 6} // Disable button if OTP is incomplete
      >
        Submit
      </Button>
    </Box>
    </div>
  );
};

export default verifyOtp;