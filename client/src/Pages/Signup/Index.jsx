import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AppButton from "../../Components/Button/Index";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { asyncSignup } from "../../Store/Auth/AuthAsync";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deepPurple } from '@mui/material/colors';

const theme = createTheme();

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let result = await dispatch(asyncSignup(data)).unwrap();
      reset();
      if (result.success) navigate("/signin");
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
            alignItems: "center",
            px: 4,
            py:6,
            background:"white",
            width:'70%',
            mx:"auto",
            borderRadius:'4px',
            boxShadow:"0px 3px 13px -9px rgb(0 0 0 / 50%)"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: deepPurple[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="fullName"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                />
                {errors.fullName && <span>{errors.fullName.message}</span>}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth={true}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  name="password"
                  label="Password"
                  type="password"
                />
                {errors.password && <span>{errors.password.message}</span>}
              </Grid>
            </Grid>
            <AppButton
              value="Sign Up"
              variant="contained"
              type="submit"
              isFullWidth={true}
              sx={{ my: 1,bgcolor: deepPurple[500]}}
            />

            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
