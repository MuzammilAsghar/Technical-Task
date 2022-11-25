import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../Button/Index";
import React from "react";
import { logout } from "../../Store/Auth/AuthSlice";
import { createTheme } from '@mui/material/styles';

const Header = () => {
  const { token } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (token) {
      dispatch(logout());
    }
    navigate("/signin");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        bgcolor: "white",
        boxShadow:"0px 3px 13px -9px rgb(0 0 0 / 50%)"
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Concept Recall | Technical Task
        </Typography>
        <nav>
            <Link component={RouterLink} to="/" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/project" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              New Project
            </Link>
            <Link component={RouterLink} to="/pending-projects" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Pending Projects
            </Link>
            <Link component={RouterLink} to="/complete-projects" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Complete Projects
            </Link>
            <Link component={RouterLink} to="/archive-projects" color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Archive Projects
            </Link>
        </nav>
        <AppButton
          value={token ? "Logout" : "Login"}
          onClick={handleClick}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
