const request = require('request');

module.exports = (eurekaClient) => {

    var ordersRemoteUrl = null;

    const MAX_RETRY_COUNT = 3;

    function askNextInstance(resolve, reject, retryCounter, requestBuilder){
        const instances = eurekaClient.getInstancesByAppId('orders');
        if(!instances || instances.length == 0 || retryCounter === MAX_RETRY_COUNT){
            ordersRemoteUrl = null;
            return reject({message: 'Orders service unavailable.'});
        }
        if(ordersRemoteUrl === null){
            ordersRemoteUrl = getOrdersUrlFromInstance(instances[0]);
        } else if (retryCounter > 0) {
            for(i = 0 ; i < instances.length; i++){
                newUrl = getOrdersUrlFromInstance(instances[i]);
                if(newUrl !== ordersRemoteUrl){
                    ordersRemoteUrl = newUrl;
                    break;
                }
                if(i === instances.length - 1){
                    ordersRemoteUrl = null;
                    return reject({message: 'Orders service unavailable.'});
                }
            }
        }

        const requestOptions = requestBuilder(ordersRemoteUrl);
        return request(requestOptions, (err, result) => {
            if (err) return askNextInstance(resolve, reject, retryCounter+1, requestUrlBuilder);
            if (result.statusCode != 200) return reject(result.body);
            try {
                const responseBody = JSON.parse(result.body);
                return resolve(responseBody);
            } catch (err) {
                return resolve(result.body);
            }
        });

    }

    return {
        getById(id) {
            return new Promise((resolve, reject) => {
                return askNextInstance(resolve, reject, 0, function(ordersRemoteUrl) {
                    return `http://${ordersRemoteUrl}/v1/orders/${id}`;
                });
            });
        },
        updateOne(id, updatedContent) {
            return new Promise((resolve, reject) => {
                return askNextInstance(resolve, reject, 0, function(ordersRemoteUrl) {
                    updateOrderRequestUrl = `http://${ordersRemoteUrl}/v1/orders/${id}`;
                    return {
                        method: 'PATCH',
                        url: updateOrderRequestUrl,
                        json: true,
                        headers: {
                           'Content-Type': 'application/json'
                        },
                        body: updatedContent
                    }
                });
            });
        }
    };
};

function getOrdersUrlFromInstance(instance) {
    if(!instance.hostName){
        return null
    }
    if(instance.hostName === "localhost"){
        return instance.hostName + ":" + instance.port['$']
    }
    return instance.hostName;
}