const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');

// middleware
const logger = require('./middleware/logger');

// router files
const bootcamp = require('./routes/bootcamp');

// load env vars
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL || '/api/v1';

const app = express();

app.use(logger);

// Mount routers
app.use(`${API_URL}/bootcamps`, bootcamp);

app.listen(PORT, () => {
  console.log(
    chalk.yellow.inverse(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`
    )
  );
});
