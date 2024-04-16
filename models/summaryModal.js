const mongoose = require('mongoose');

// Define the schema for the text summary data
const textSummarySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  summaryArray: {
    type: [String], // Array of strings
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

// Create a model using the schema
const TextSummary = mongoose.model('TextSummary', textSummarySchema);

module.exports = TextSummary;
