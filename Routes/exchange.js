const express = require("express");
const router = express.Router();

const { allCurrencies } = require("../Controller/avaliableCurrency");
router.get("/currencies", allCurrencies);



router.get("/convert", (req, res) => {
    res.send("Convert Currency");
});

module.exports = router;