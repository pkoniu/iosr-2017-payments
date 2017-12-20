const request = require('request');

module.exports = () => {
    const {MENU_SERVICE_URL = 'localhost:3001'} = process.env;

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                const getOrderByIdUrl = `http://${MENU_SERVICE_URL}/v1/orders/${id}`;
                return request(getOrderByIdUrl, (err, result) => {
                    if (err) return reject(err);
                    const responseBody = JSON.parse(result.body);
                    return resolve(responseBody);
                });
            });
        }
    };
};