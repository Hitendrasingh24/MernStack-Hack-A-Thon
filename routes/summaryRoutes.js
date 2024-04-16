const express = require("express");
const {saveSummaryString,getSummaryString} = require("../controllers/historyController");

//router object
const router = express.Router();

//routes
// SAVE
router.post("/save", saveSummaryString);


//get
router.get("/get", getSummaryString);

module.exports = router;
