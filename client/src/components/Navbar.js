import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { host } from "../apiRoutes/api";
const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));


  const handleLogout = async () => {
    try {
      await axios.post(`${host}/api/v1/auth/logout`);
      localStorage.removeItem("authToken");
      localStorage.removeItem("emailToken");
      toast.success("logout successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        Data Enrichment Tool.
      </Typography>
      
      {loggedIn ? (
        <>
          <NavLink to="/" p={1}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} p={1}>
            Logout
          </NavLink>
          <NavLink to="/history" p={1}>
            History
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Sign In
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
