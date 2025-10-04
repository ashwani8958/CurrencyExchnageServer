const axios = require('axios');

async function getUSDExchangeRate() {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest');
    return response.data;
  } catch (err) {
    console.error('Error fetching API data:', err);
  }
}

async function getCustomExchangeRate(baseCurrency) {
  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${baseCurrency}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching API data:', err);
  }
}

module.exports = {getUSDExchangeRate, getCustomExchangeRate};