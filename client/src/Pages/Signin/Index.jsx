import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AppButton from "../../Components/Button/Index";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { asyncSignin } from "../../Store/Auth/AuthAsync";
import { useDispatch } from "react-redux";
import './Login.css';

const theme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    // return false;
    try {
      let result = await dispatch(asyncSignin(data)).unwrap();
      reset();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            py:6,
            px:4,
            background:"white",
            width:'70%',
            mx:"auto",
            borderRadius:'4px',
            boxShadow:"0px 3px 13px -9px rgb(0 0 0 / 50%)"
          }}
        >
          <Avatar sx={{ bgcolor: deepPurple[500],mx:'auto',mb:1 }}>
            <AccountCircleIcon />
            </Avatar>
          <Typography component="h1" variant="h5" sx={{mx:'auto'}}>
            Sign in
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            fullWidth={true}
            sx={{ mt: 1}}
          >
            <TextField
              margin="normal"
              required
              fullWidth={true}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              label="Email Address"
              name="email"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <TextField
              margin="normal"
              required
              fullWidth={true}
              name="password"
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              type="password"
            />
             {errors.password && <span>{errors.password.message}</span>}
            <Button 
              variant="contained" 
              size="medium"
              value="Sign In"
              type="submit"
              fullWidth={true}
              sx={{ my: 1,bgcolor: deepPurple[500]}}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
