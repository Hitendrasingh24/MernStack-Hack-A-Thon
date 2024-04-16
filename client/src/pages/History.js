import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HistoryComponent from '../components/HistoryComponent';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";


export default function History() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [summaryArray, setSummaryArray] = useState([]);
  const [email, setEmail] = useState("");
  

  useEffect(() => {
    // Get email from local storage
    const userEmail = localStorage.getItem("emailToken");
    if(!userEmail) {
      // Navigate to the login page if authToken is not set or not true
      navigate("/login");
    }
    if (userEmail) {
      setEmail(userEmail);
    }

    // Fetch summary array from backend API when the component mounts
    const fetchSummaryArray = async () => {
      try {
        const response = await axios.get('/api/v1/summary/get', {
          params: { email: userEmail }
        });
        setSummaryArray(response.data.summaryArray);
      } catch (error) {
        console.error('Error fetching summary array:', error);
      }
    };

    fetchSummaryArray(); // Call the fetchSummaryArray function
  }, []); // Empty dependency array ensures this effect runs only once after initial mount

  
  return (
    <>
       <Box
      width={isNotMobile ? "40%" : "95%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
     
        <Typography variant="h3">Your History:-</Typography>
      <div>
        {summaryArray.map((summary, index) => (
          <HistoryComponent key={index} sum={summary} />
        ))}
      </div>
      </Box>
    </>
  );
}
