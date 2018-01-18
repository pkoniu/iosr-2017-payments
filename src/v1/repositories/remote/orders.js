const request = require('request');

module.exports = () => {
    const {ORDERS_SERVICE_URL = 'localhost:3003'} = process.env;

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                const getOrderByIdUrl = `http://${ORDERS_SERVICE_URL}/v1/orders/${id}`;
                return request(getOrderByIdUrl, (err, result) => {
                    if (err) return reject(err);
                    const responseBody = JSON.parse(result.body);
                    return resolve(responseBody);
                });
            });
        },
        updateOne(id, updatedContent) {
            return new Promise((resolve, reject) => {
                const updateOrderRequestUrl = `http://${ORDERS_SERVICE_URL}/v1/orders/${id}`;
                return request({
                        method: 'PATCH',
                        url: updateOrderRequestUrl,
                        json: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: updatedContent
                    }, (err, result) => {
                    if (err) return reject(err);
                    if (result.statusCode != 200) return reject(result.body);
                    return resolve(result.body);
                });
            });
        }
    };
};