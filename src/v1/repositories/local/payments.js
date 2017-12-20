const _ = require('lodash');

const queriesBuilder = require('./queries-builder')();

module.exports = (collection) => {
    return {
        getAll() {
            return collection.find().toArray();
        },
        getById(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.find(filter).toArray();
        },
        createNew(details) {
            return collection.insertOne(details)
                .then(insertResponse => {
                    const createdPayment = _.get(insertResponse, 'ops.0', {});
                    return {
                        createdPayment
                    };
                });
        },
        deleteOne(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.findOneAndDelete(filter)
                .then(deleteResponse => {
                    const deletedPayment = _.get(deleteResponse, 'value', {});
                    return {
                        deletedPayment
                    };
                });
        },
        updateOne(id, toUpdate) {
            const filter = queriesBuilder.getByIdQuery(id);
            const update = {$set:toUpdate};
            const options = {returnOriginal: false};
            debugger;
            return collection.findOneAndUpdate(filter, update, options)
                .then(updateResponse => {
                    const updatedPayment = _.get(updateResponse, 'value', {});
                    return {updatedPayment};
                });
        }
    };
};