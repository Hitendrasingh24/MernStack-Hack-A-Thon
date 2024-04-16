import React, { useState } from "react";
import toast from "react-hot-toast";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import pdfToText from 'react-pdftotext'
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const Summary = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error1, setError1] = useState("");
  
  function extractText(event) {
    const file = event.target.files[0]
    try{
      pdfToText(file)
      .then(txt => {
        console.log(txt)
        setText(txt);
      })
      .catch(error => console.error("Failed to extract text from pdf"))
    }
    catch(err){
      setError1("please upload file in proper format")
    }
}
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      console.log(data);
      const dt = data.replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>');
      const sum  = dt.replace(/\*/g, '<br/>');
      setSummary(sum.trim());
    } catch (err) {
      console.log(error1);
      if (err.response.data.error) {
        setError1(err.response.data.error);
      } else if (err.message) {
        setError1(err.message);
      }
      setTimeout(() => {
        setError1("");
      }, 5000);
    }
  };
    const handleSave = async () => {
      if(text===""){
        toast.error("No data present");
      }  
      else{
        const email = localStorage.getItem("emailToken");
        const response = await axios.post('api/v1/summary/save', { email,summary});
        if(response){
          toast.success("Saved History Successfully");
        }
      }
    };
    
    const handleCopy = () => {
      const cleanSummary = summary.replace(/<h2>(.*?)<\/h2>|<br\/>/g, "");
      navigator.clipboard.writeText(cleanSummary)
        .then(() => {
          toast.success("Summary copied to clipboard");
        })
        .catch(err => {
          // console.error("Failed to copy summary to clipboard:", err);
          toast.error("Failed to copy summary to clipboard");
        });
    };
  
  return (
    <Box
      width={isNotMobile ? "40%" : "95%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error1}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error1}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Enrich Text</Typography>

        <TextField
          placeholder="add your file"
          type="file"
          required
          margin="normal"
          fullWidth
          onChange={extractText}
          />
        
      
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
     
      </form>
      
      <Button
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 ,borderRadius:"50px" }}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
        variant="contained"
        size="large"
        sx={{ color: "white", mt: 2, borderRadius: "50px" }}
        onClick={handleCopy}
      >
        Copy
      </Button>

      {summary ? (
        <Card
          sx={{
            mt: 1,
            border: 1,
            boxShadow: 0,
            height: "600px",
            borderRadius: 5,
            overflow: "auto",
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
        {/* ( */}
          {/* <Typography p={4}>{summary}</Typography> */}
          <Typography p={4} dangerouslySetInnerHTML={{ __html: summary }} />
        </Card>
      ) : (
        <Card
          sx={{
            mt: 1,
            border: 1,
            boxShadow: 0,
            height: "600px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Data Will Appear Here ...
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Summary;
