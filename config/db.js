const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/sidhu');
    console.log(
      `Connected To Mongodb Database`.bgGreen.white
    );
  } catch (error) {
    console.log(`Mognodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
