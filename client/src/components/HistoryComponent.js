import React from "react";
import { Typography } from "@mui/material";
import {
    Card,
  } from "@mui/material";

const HistoryComponent = ({ sum }) => {
  return (
    <>
    {sum ? (
        <Card
        sx={{
            mt: 1,
            border: 1,
            boxShadow: 0,
            height: "12rem",
            borderRadius: 5,
            overflow: "auto",
            borderColor: "natural.medium",
            bgcolor: "background.default",
        }}
        >
        {/* ( */}
          {/* <Typography p={4}>{summary}</Typography> */}
          <Typography p={4} dangerouslySetInnerHTML={{ __html: sum }} />
        </Card>
      ) :<div></div> 
    }
     </>
  );
};

export default HistoryComponent;