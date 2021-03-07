const express = require('express');
const dotenv = require('dotenv');
const chalk = require('chalk');


// load env vars
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(chalk.yellow.inverse(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
})
