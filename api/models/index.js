const Users = require("./user");
const Products = require("./product");
const Cart = require("./cart");
const Purchases = require("./purchases");
const Comment = require("./comment");

Comment.belongsTo(Users);
Comment.belongsTo(Products);
Cart.belongsTo(Users);
Purchases.belongsTo(Users);
Users.hasMany(Cart);

module.exports = { Users, Products, Cart, Purchases, Comment };
