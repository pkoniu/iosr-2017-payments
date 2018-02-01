const _ = require('lodash');

module.exports = (paymentsRepo, ordersToProcessQueue, menuService, ordersService, storageService) => {
    return (req, res, next) => {
        const newPaymentDetails = _.get(req, 'body', {});

        if (Object.keys(newPaymentDetails).length === 0) {
            return next({
                status: 400,
                message: 'New payment details cannot be empty.'
            });
        }
        if (newPaymentDetails.orderId == null) {
            return next({
               status: 400,
               message: 'New payment orderId cannot be empty.'
           });
        }
        return ordersService.getById(newPaymentDetails.orderId)
            .then(order => {
                if(_.isEmpty(order)){
                    return Promise.reject({status: 400, message: "There is no order with such id."})
                }
                order = order[0]
                if(order.status && order.status !== "unpaid"){
                    return Promise.reject({status: 400, message: "Order with such id is not unpaid."})
                }
                return menuService.getById(order.id)
            })
            .then(menuItem => {
                if(_.isEmpty(menuItem)){
                    return Promise.reject({status: 400, message: "No menu item exists for given order."})
                }
                menuItem = menuItem[0]
                price = menuItem.price
                //todo any fake visa/mastercard service?
                var ingredientsToUpdate = []
                for( var i = 0; i < menuItem.ingredients.length; i++ ) {
                    var ingredient = menuItem.ingredients[i]
                    if(ingredient.name != null && ingredient.amount != null && ingredient.amount > 0){
                        ingredientsToUpdate.push({name: ingredient.name, amount: -ingredient.amount})
                    }
                }
                return storageService.updateMany(ingredientsToUpdate)
            })
            .then(response => {
                return ordersService.updateOne(newPaymentDetails.orderId, {status: "paid"})
            })
            .then(response => {
                return ordersToProcessQueue.addOrderToProcess(newPaymentDetails.orderId)
            })
            //todo handle full queue
            .then( isFull => {
                return paymentsRepo.createNew(newPaymentDetails)
            })
            .then(creationResult => {
                return res.status(201).json(creationResult);
            }).catch(next);
    };
};
