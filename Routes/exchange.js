const express = require("express");
const router = express.Router();

const { allCurrencies } = require("../Controller/avaliableCurrency");
const { convertCurrency } = require("../Controller/currencyConversion");
const validateConvert = require('../Middleware/validateConvert');

// Simple router-level logger: logs method, path, baseUrl and timestamp for every request
router.use((req, res, next) => {
	const time = new Date().toISOString();
	// req.baseUrl is the path this router is mounted on in the main app
	console.log(`[Exchange Router] ${time} - ${req.method} ${req.baseUrl}${req.path}`);
	next();
});

router.get("/currencies", allCurrencies);
router.get("/convert", validateConvert, convertCurrency);


module.exports = router;