const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    const paymentsRepo = require('./repositories/local/payments')(mongodb.collection('payments'));
    app.use('/payments', require('./routes/payments')(paymentsRepo));

    return app;
};