const express = require('express');


const server = express();
const PORT = 8090;



server.listen(PORT, () => {
    console.log(`Currency Exchange Server is running on port ${PORT}`);
});