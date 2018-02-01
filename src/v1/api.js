const express = require('express');

module.exports = (mongodb, amqpData, eurekaClient) => {
    const app = express();

    const paymentsRepo = require('./repositories/local/payments')(mongodb.collection('payments'));

    const ordersToProcessQueue = require('./repositories/remote/orders-to-process-queue')(amqpData);
    const menuRemoteService = require('./repositories/remote/menu')(eurekaClient);
    const ordersRemoteService = require('./repositories/remote/orders')(eurekaClient);
    const storageRemoteService = require('./repositories/remote/storage')(eurekaClient);
    app.use('/payments', require('./routes/payments')(paymentsRepo, ordersToProcessQueue, menuRemoteService, ordersRemoteService, storageRemoteService));

    return app;
};