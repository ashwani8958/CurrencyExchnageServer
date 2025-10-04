const currenciesFromAPI = require('../utility/exchangeRateData');

const allCurrencies = async (req, res) => {
    try {
        const data = await currenciesFromAPI.getUSDExchangeRate();
        const currencies = data.rates;
        res.status(200).json(Object.keys(currencies));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
};


module.exports = {
    allCurrencies,
};
