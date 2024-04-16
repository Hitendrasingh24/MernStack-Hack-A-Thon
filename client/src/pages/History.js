import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HistoryComponent from '../components/HistoryComponent';
import { host } from '../apiRoutes/api';
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

  const[num,setNum] = useState(0);
  const [summaryArray, setSummaryArray] = useState([]);
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    setNum(summaryArray.length);
  }, [summaryArray]);

  useEffect(() => {
    // Get email from local storage
    const userEmail = localStorage.getItem("emailToken");
    if(!userEmail) {
      navigate("/login");
    }
    if (userEmail) {
      setEmail(userEmail);
    }

    const fetchSummaryArray = async () => {
      try {
        const response = await axios.get(`${host}/api/v1/summary/get`, {
          params: { email: userEmail }
        });
        setSummaryArray(response.data.summaryArray);
      } catch (error) {
        console.error('Error fetching summary array:', error);
      }
    };

    fetchSummaryArray(); 
  }, []); 
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
     
        <Typography variant="h3">Your History:-{num} Items</Typography>
      <div>
        {summaryArray.map((summary, index) => (
          <HistoryComponent key={index} sum={summary} />
        ))}
      </div>
      </Box>
    </>
  );
}
