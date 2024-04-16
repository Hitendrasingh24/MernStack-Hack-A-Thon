const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyDMOucq5Zuz_DmfuolzTxUzKsl7jrx3klg');
// const { PDFLoader } = require("langchain/document_loaders/fs/pdf");

dotenv.config();


exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const prompt = `Do summarize and give some extra info  on this text given ahead  in around 600 words:-\n${text}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = response.text();

    if (data) {
      if (data) {
        return res.status(200).json(data);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};




// const Summary = require('../models/Summary');

// // Controller function to save a new summary string to the array in the summary model
// const saveSummaryString = async (req, res) => {
//   const { _id } = req.params; // Assuming _id is passed as a route parameter
//   const { summary } = req.body;

//   try {
//     const existingSummary = await Summary.findById(_id);
//     if (!existingSummary) {
//       return res.status(404).json({ error: 'Summary not found' });
//     }

//     existingSummary.summaryArray.push(summary);
//     await existingSummary.save();

//     res.status(201).json({ message: 'Summary string saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { saveSummaryString };



// const Summary = require('../models/Summary');

// // Controller function to get the array of summary strings from the summary model
// const getSummaryStrings = async (req, res) => {
//   const { _id } = req.params; // Assuming _id is passed as a route parameter

//   try {
//     const existingSummary = await Summary.findById(_id);
//     if (!existingSummary) {
//       return res.status(404).json({ error: 'Summary not found' });
//     }

//     const summaryArray = existingSummary.summaryArray;
//     res.status(200).json({ summaryArray });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { getSummaryStrings };


