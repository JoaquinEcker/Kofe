const S = require("sequelize");
const sequelize = require("../config/database");

class Comment extends S.Model {}

Comment.init({
    userId: {
        type: S.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    productId: {
        type: S.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        }
    },
    content: {
        type: S.TEXT,
        allowNull: false,
    }
},{
    sequelize, modelName: "comments"
})

module.exports = Comment;

