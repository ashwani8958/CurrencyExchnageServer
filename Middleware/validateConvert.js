// Validation middleware for /exchange/convert
// Ensures: value is required, numeric and non-negative
//          currency and to_currency are required 3-letter alphabetic codes

const codeRegex = /^[A-Za-z]{3}$/;

function validateConvertQuery(req, res, next) {
  let { value, currency, to_currency } = req.query;
  const errors = [];

  if (value === undefined) {
    errors.push('value is required');
  } else if (value === '') {
    errors.push('value cannot be empty');
  } else if (isNaN(Number(value))) {
    errors.push('value must be a number');
  } else if (Number(value) < 0) {
    errors.push('value must be a non-negative number');
  }

  if (!currency) {
    errors.push('currency is required');
  } else if (!codeRegex.test(currency)) {
    errors.push('currency must be a 3-letter alphabetic code (e.g. USD)');
  }

  if (!to_currency) {
    errors.push('to_currency is required');
  } else if (!codeRegex.test(to_currency)) {
    errors.push('to_currency must be a 3-letter alphabetic code (e.g. EUR)');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Normalize codes to uppercase and keep value as-is (controller will parse)
  req.query.currency = currency.toUpperCase();
  req.query.to_currency = to_currency.toUpperCase();

  next();
}

module.exports = validateConvertQuery;
