const request = require('request');

module.exports = (eurekaClient) => {

    var storageRemoteUrl = null;

    const MAX_RETRY_COUNT = 3;

    function askNextInstance(resolve, reject, retryCounter, requestBuilder){
        const instances = eurekaClient.getInstancesByAppId('storage');
        if(!instances || instances.length == 0 || retryCounter === MAX_RETRY_COUNT){
            storageRemoteUrl = null;
            return reject({message: 'Storage service unavailable.'});
        }
        if(storageRemoteUrl === null){
            storageRemoteUrl = getStorageUrlFromInstance(instances[0]);
        } else if (retryCounter > 0) {
            for(i = 0 ; i < instances.length; i++){
                newUrl = getStorageUrlFromInstance(instances[i]);
                if(newUrl !== storageRemoteUrl){
                    storageRemoteUrl = newUrl;
                    break;
                }
                if(i === instances.length - 1){
                    storageRemoteUrl = null;
                    return reject({message: 'Storage service unavailable.'});
                }
            }
        }

        const requestOptions = requestBuilder(storageRemoteUrl);
        return request(requestOptions, (err, result) => {
            if (err) return askNextInstance(resolve, reject, retryCounter+1, requestUrlBuilder);
            if (result.statusCode != 200) return reject(result.body);
            return resolve(result.body);
        });

    }

    return {
        updateMany(requestPayload, headers) {
            return new Promise((resolve, reject) => {
                return askNextInstance(resolve, reject, 0, function(storageRemoteUrl) {
                    return {
                        method: 'PATCH',
                        url: `http://${storageRemoteUrl}/v1/storage/items`,
                        json: true,
                        headers: {
                           'Content-Type': 'application/json',
                            'Authorization': headers.authorization
                        },
                        body: requestPayload
                    }
                });
            });
        }
    };
};

function getStorageUrlFromInstance(instance) {
    if(!instance.hostName){
        return null
    }
    if(instance.hostName === "localhost"){
        return instance.hostName + ":" + instance.port['$']
    }
    return instance.hostName;
}