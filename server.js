const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middelwares/errorMiddleware");


//routes path
const authRoutes = require("./routes/authRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT =process.env.PORT || 8080;



// // Storage for uploaded PDF files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'langs/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });




//API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));
app.use("/api/v1/summary", summaryRoutes);

//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running in  mode on port no ${PORT}`.bgCyan
      .white
  );
});
