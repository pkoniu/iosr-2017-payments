const express = require('express');

module.exports = (paymentsRepo) => {
    const app = express();

    app.get('/', require('./handlers/get-all')(paymentsRepo));
    app.get('/:id', require('./handlers/get-by-id')(paymentsRepo));
    app.post('/', require('./handlers/create-new')(paymentsRepo));
    app.delete('/:id', require('./handlers/delete-by-id')(paymentsRepo));
    app.patch('/:id', require('./handlers/update-by-id')(paymentsRepo));

    return app;
};
