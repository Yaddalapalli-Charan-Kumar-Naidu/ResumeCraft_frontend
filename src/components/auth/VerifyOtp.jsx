import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader"; // Import HashLoader

const VerifyOtp = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const { token } = location.state || {};
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loader
  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue);
    setError(""); // Clear error when user types
  };

  const handleSubmit = () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsSubmitting(true); // Show loader

    const data = JSON.stringify({
      email: email,
      otp: otp,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASEURL}/auth/verify-otp?`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (token !== undefined) {
          localStorage.setItem("token", token);
          toast.success("Login successful! Redirecting..."); // Success toast
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          toast.success("OTP verified successfully! Redirecting to login..."); // Success toast
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } // Redirect after 2 seconds
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // Server responded with a status code outside 2xx
          toast.error(
            `OTP verification failed: ${
              error.response.data.message || "Unknown error"
            }`
          ); // Error toast
        } else if (error.request) {
          // No response received
          toast.error("Network error. Please try again."); // Network error toast
        } else {
          // Something else went wrong
          toast.error("An unexpected error occurred."); // Generic error toast
        }
      })
      .finally(() => {
        setIsSubmitting(false); // Hide loader
      });
  };
  const handleResend = () => {
    let data = JSON.stringify({
      email: email,
    });
setIsSubmitting(true);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASEURL}/auth/forgot-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("error sending otp")
      })
      .finally(() => { 
        setIsSubmitting(false);
      })
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <ToastContainer position="bottom-right" autoClose={3000} />{" "}
      {/* Toast container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          maxWidth: 400,
          margin: "0 auto",
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Enter OTP
        </Typography>
        <Typography>
          OTP sent to {email}{" "}
          <Button className="self-end" onClick={handleResend}>
            resend otp
          </Button>
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
          disabled={otp.length !== 6 || isSubmitting} // Disable button if OTP is incomplete or submitting
        >
          {isSubmitting ? "Verifying..." : "Submit"}
        </Button>
      </Box>
      {/* HashLoader */}
      {isSubmitting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <HashLoader color="purple" size={60} /> {/* Use HashLoader */}
        </Box>
      )}
    </div>
  );
};

export default VerifyOtp;
