const {Purchases, Products} = require('../models');

class PurchasesController {
    static async getPurchases(req, res, next) {
        try {
            const purchases = await Purchases.findAll();
            return res.status(200).send(purchases)
        }
        catch (err) {
            next(err);
        }
    }

    static async getPurchasesByUserId(req, res, next) {
        try {
            const purchases = await Purchases.findAll({
                where:{
                    userId: req.params.id
                },
            })
            return res.status(200).send(purchases)
        }
        catch (err) {
            next(err);
        }
    }

    

    static async getCurrentUserPurchases(req, res, next) {
        try {
            const purchases = await Purchases.findAll({
                where:{
                    userId: req.user.id
                },
            })
            return res.status(200).send(purchases)
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = PurchasesController;