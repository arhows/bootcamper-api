const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(chalk.bgGrey(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(chalk.bgRed('Connection Error: ', error));
    conn.close();
  }
};

module.exports = connectDB;
