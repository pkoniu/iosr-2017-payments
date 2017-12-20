const _ = require('lodash');

module.exports = (paymentsRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return paymentsRepo.getById(id)
            .then(order => {
                return res.status(200).json(order);
            }).catch(next);
    };
};
