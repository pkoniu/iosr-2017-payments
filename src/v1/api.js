const express = require('express');

module.exports = (mongodb, amqpData) => {
    const app = express();

    const paymentsRepo = require('./repositories/local/payments')(mongodb.collection('payments'));

    const ordersToProcessQueue = require('./repositories/remote/orders-to-process-queue')(amqpData);
    app.use('/payments', require('./routes/payments')(paymentsRepo, ordersToProcessQueue));

    return app;
};