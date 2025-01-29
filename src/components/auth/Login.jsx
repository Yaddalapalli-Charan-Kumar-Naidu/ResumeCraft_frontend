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
          // Server responded with a status code outside 2xx
          toast.error(`Login failed: ${error.response.data.message || "Unknown error"}`); // Error toast
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
  
  return (
    <Container component="main" maxWidth="lg">
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* Toast container */}
      <Box
        sx={{
          marginTop: 15,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(login.jpeg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
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