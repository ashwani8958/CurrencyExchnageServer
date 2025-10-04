const express = require('express');
const cron = require('node-cron');
const currencyData = require('./utility/exchangeRateData');
const exchangeRoutes = require('./Routes/exchange');
const server = express();
const PORT = 8090;

// Variable to store API data
let storeData = null;


// Schedule the job to run once every 24 hours at midnight
// cron.schedule('0 0 * * *', () => {
//   console.log('Running scheduled API fetch...');
//   storeData = currencyData.fetchDataAndStore();
// });


// routes
server.use('/exchange', exchangeRoutes);

server.listen(PORT, () => {
    console.log(`Currency Exchange Server is running on port ${PORT}`);
});