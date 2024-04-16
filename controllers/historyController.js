const TextSummary = require("../models/summaryModal");



exports.saveSummaryString = async (req, res) => {
  const { email, summary } = req.body;

  try {
    let existingSummary = await TextSummary.findOne({ email });

    if (!existingSummary) {
      existingSummary = new TextSummary({
        email,
        summaryArray: [ summary] // Initialize summaryArray with the first summary string
      });
    } else {
      existingSummary.summaryArray.push( summary);
    }

    await existingSummary.save();

    res.status(201).json({ message: 'Summary string saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error' });
  }
};


exports.getSummaryString = async (req, res) => {
    const { email } = req.query; 
  
    try {
      const existingSummary = await TextSummary.findOne({ email });
      if (!existingSummary) {
        return res.status(404).json({ error: 'Summary not found' });
      }
  
      const summaryArray = existingSummary.summaryArray;
      res.status(200).json({ summaryArray });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
