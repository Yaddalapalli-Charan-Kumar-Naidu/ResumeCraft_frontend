import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from 'react-spinners/HashLoader';



export default function Login() {
  const BASEURL = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loader
 

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Show loader

    const data = new FormData(event.currentTarget);

    // Convert FormData to a plain object
    const payload = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASEURL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload, // Use the payload object instead of FormData
    };

    axios
      .request(config)
      .then((response) => {
        if(response.data.isVerified===true){
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting..."); // Success toast
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); 
      }// Redirect after 2 seconds
      else{
        navigate("/verify-otp",{ state: { email: payload.email,token:response.data.token } });
      }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // Extract error message from API response
          const errorMessage = error.response.data?.msg || "Unknown error occurred";
          toast.error(`Login failed: ${errorMessage}`);
        } else if (error.request) {
          // No response received
          toast.error("Network error. Please check your connection and try again.");
        } else {
          // Other errors (e.g., request setup issues)
          toast.error(`An unexpected error occurred: ${error.message}`);
        }
      })
      .finally(() => {
        setIsSubmitting(false); // Hide loader
      });
  };
  
  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* Toast container */}
      <Box
        sx={{
          marginTop: 15,
          marginBottom:10
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
              src="login.gif"
              alt="signin illustration"
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
              backgroundImage: "url(login.gif)",
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
                Sign In
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Logging In..." : "Sign In"}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot-password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
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
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 9999,
          }}
        >
          <HashLoader color="purple" size={60} /> 
        </Box>
      )}
    </Container>
  );
}