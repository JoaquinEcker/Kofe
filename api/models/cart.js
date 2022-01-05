const S = require("sequelize");
const sequelize = require("../config/database");
const Products = require("./product");

class Cart extends S.Model {
  static async addToCart(userId, productId, quantity) {
    const cart = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (cart) {
      await cart.update({
        quantity: cart.quantity + quantity,
      });
    } else {
      await Cart.create({
        userId,
        productId,
        quantity,
      });
    }
  }

  static async getCarts(userId) {
    const cart = await Cart.findAll({
      where: {
        userId,
      },
    });

    return cart;
  }

  static async deleteCart(userId) {
    await Cart.destroy({
      where: {
        userId,
      },
    });
  }

  static async checkout(userId) {
    await Cart.destroy({
      where: {
        userId,
      },
    });
  }
}

Cart.init(
  {
    userId: {
      type: S.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
    },
    productId: {
      type: S.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id"
      },
    },
    imgUrl: {
      type: S.STRING,
    },
    productName: {
      type: S.STRING,
    },
    price: {
      type: S.INTEGER,
    },
    quantity: {
      type: S.INTEGER,
      allowNull: false
    },
  },
  {
    hooks: {
      //hooks
      beforeCreate: async (cart) => {
        const product = await Products.findByPk(cart.productId);
        cart.price = product.price;
        cart.productName = product.title;
        cart.imgUrl = product.imgUrl;
      }
    },
    sequelize,
    modelName: "cart"
  }
);

module.exports = Cart;
