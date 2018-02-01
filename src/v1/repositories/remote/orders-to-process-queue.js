module.exports = (amqpData) => {
    return {
        addOrderToProcess(id, headers) {
            return new Promise((resolve, reject) => {
                const options = {persistent: true};
                const mesage = {id, token: headers.authorization};
                isNotFull = amqpData.channel.sendToQueue(amqpData.queue, Buffer.from(JSON.stringify(mesage)), options);
                if (!isNotFull) return reject({message: "Queue full."})
                return resolve(true);
            });
        }
    };
};