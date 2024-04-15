const express = require("express");
const {
  summaryController,
  // langController
} = require("../controllers/openiaController");

const router = express.Router();

//route
router.post("/summary", summaryController);
// router.post("/lang", langController);

module.exports = router;
