const _ = require('lodash');

module.exports = (paymentsRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return paymentsRepo.deleteOne(id)
            .then(deletionResult => {
                return res.status(200).json(deletionResult);
            }).catch(next);
    };
};
