require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const currencyData = require('./utility/exchangeRateData');
const exchangeRoutes = require('./Routes/exchange');
const server = express();

// Read from environment with sensible defaults
const PORT = Number(process.env.PORT);
const HOST = process.env.HOST;

// Variable to store API data
let storeData = null;


// Schedule the job to run once every 24 hours at midnight
// cron.schedule('0 0 * * *', () => {
//   console.log('Running scheduled API fetch...');
//   storeData = currencyData.fetchDataAndStore();
// });


// routes
server.use('/exchange', exchangeRoutes);

server.listen(PORT, HOST, () => {
    console.log(`Currency Exchange Server is running on ${HOST}:${PORT}`);
});