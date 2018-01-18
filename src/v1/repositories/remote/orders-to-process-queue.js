module.exports = (amqpData) => {
    return {
        addOrderToProcess(id) {
            return new Promise((resolve, reject) => {
                const options = {persistent: true};
                isNotFull = amqpData.channel.sendToQueue(amqpData.queue, Buffer.from(id), options);
                if(!isNotFull) return reject({message: "Queue full."})
                return resolve(true);
            });
        }
    };
};