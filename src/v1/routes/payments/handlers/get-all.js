module.exports = (paymentsRepo) => {
    return (req, res, next) => {
        return paymentsRepo.getAll()
            .then(orders => {
                return res.status(200).json(orders);
            }).catch(next);
    };
};
