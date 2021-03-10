const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');
const morgan = require('morgan');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || '/api/v1';

// Connect to database
connectDB();

// middleware
// const logger = require('./middleware/logger');

// router files
const bootcamp = require('./routes/bootcamp');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // app.use(logger);
}

// Mount routers
app.use(`${API_URL}/bootcamps`, bootcamp);

const server = app.listen(PORT, () => {
  console.log(
    chalk.blue.inverse(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`
    )
  );
});

// Handle unhlandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(chalk.bgMagenta(`Error: ${err.message}`));

  // close server & exite processe
  server.close(() => process.exit(1));
});
