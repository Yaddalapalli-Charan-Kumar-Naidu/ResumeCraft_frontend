import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from 'react-spinners/HashLoader';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form fields
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for submission
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phoneNumber", formData.phoneNumber);
    if (formData.profilePicture) {
      data.append("profilePicture", formData.profilePicture);
    }

    const BASEURL = import.meta.env.VITE_BASEURL;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASEURL}/auth/signup`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Signup successful! Redirecting to OTP verification..."); // Success toast
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // Server responded with a status code outside 2xx
          toast.error(`Signup failed: ${error.response.data?.msg ||error.response.data.errors[0].msg|| "Unknown error"}`); // Error toast
        } else if (error.request) {
          // No response received
          toast.error("Network error. Please try again."); // Network error toast
        } else {
          // Something else went wrong
          toast.error("An unexpected error occurred."); // Generic error toast
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* Toast container */}
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: 300
            }}
          >
            <img
              src="signup.svg"
              alt="signup illustration"
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: 500,
                objectFit: 'contain'
              }}
            />
          </Grid>

          {/* Desktop Image */}
          <Grid
            item
            xs={false}
            md={7}
            sx={{
              display: { xs: 'none', md: 'block' },
              backgroundImage: "url(signup.svg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />

          {/* Form Section */}
          <Grid
            item
            xs={12}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                {/* Profile Picture Upload */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    onChange={handleChange}
                  />
                  <label htmlFor="profilePicture">
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: "pointer",
                        position: "relative",
                      }}
                      src={
                        formData.profilePicture
                          ? URL.createObjectURL(formData.profilePicture)
                          : ""
                      }
                    >
                      {!formData.profilePicture && (
                        <CameraAltIcon
                          sx={{
                            fontSize: 40,
                            color: "action.active",
                          }}
                        />
                      )}
                    </Avatar>
                  </label>
                </Box>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* WifiLoader */}
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
          <HashLoader color="purple" size={60} />
        </Box>
      )}
    </Container>
  );
}