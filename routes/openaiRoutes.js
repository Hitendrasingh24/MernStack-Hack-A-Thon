const express = require("express");
const {
  summaryController,
} = require("../controllers/openiaController");

const router = express.Router();

//route
router.post("/summary", summaryController);

module.exports = router;
