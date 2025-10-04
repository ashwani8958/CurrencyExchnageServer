const currenciesFromAPI = require('../utility/exchangeRateData');

const convertCurrency = async (req, res) => {
    
    const { value, currency, to_currency } = req.query;
    console.log(`convertCurrency query: value=${value}, currency=${currency}, to_currency=${to_currency}`);

    try {
        const data = await currenciesFromAPI.getCustomExchangeRate(currency);
        const rates = data.rates;

        if (!rates[to_currency]) {
            return res.status(404).json({ error: `Unsupported target currency: ${to_currency}` });
        }

        const convertedAmount = (rates[to_currency] * parseFloat(value)).toFixed(2);
        res.status(200).json({ from: currency, to: to_currency, originalAmount: value, convertedAmount });

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

module.exports = {
    convertCurrency,
};