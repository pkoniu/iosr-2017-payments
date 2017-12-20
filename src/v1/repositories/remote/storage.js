const request = require('request');

module.exports = () => {
    const {MENU_SERVICE_URL = 'localhost:3003'} = process.env;

    return {
        updateMany(requestPayload) {
            return new Promise((resolve, reject) => {
                const updateStorageAmountsUrl = `http://${MENU_SERVICE_URL}/v1/storage/items`;
                return request({
                        method: 'PATCH',
                        url: updateStorageAmountsUrl,
                        json: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: requestPayload
                    }, (err, result) => {
                    if (err) return reject(err);
                    if (result.statusCode != 200) return reject(result.body);
                    return resolve(result.body);
                });
            });
        }
    };
};