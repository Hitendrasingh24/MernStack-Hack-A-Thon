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






