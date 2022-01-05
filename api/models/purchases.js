const S = require("sequelize");
const sequelize = require("../config/database");


class Purchases extends S.Model {
  //methods
  static async getAllPurchases(userId) {
    return await this.findAll({
      where: {
        userId: userId,
      },
    });
  }
}

Purchases.init(
  {
    userId: {
      type: S.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    productArray: {
      type: S.ARRAY(S.JSON), //array of carts, ordered like this: [{id: 1, quantity: 2}, {id: 2, quantity: 3}]
      allowNull: false,
      defaultValue: [],
    },
    totalPrice: {
      type: S.INTEGER,
    },
  },
  {
    hooks: {
        beforeCreate: async (purchase) => {
            let total = 0;
            purchase.productArray.forEach((cart) => {
                total += cart.price * cart.quantity;
            });
            
            purchase.totalPrice = total;
        }
    },
    sequelize,
    modelName: "purchases",
  }
);

module.exports = Purchases;
