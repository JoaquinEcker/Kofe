const S = require('sequelize');
const sequelize = require('../config/database');


class Products extends S.Model {
    //model methods with "static" & instance methods only with the function name 
}

Products.init({
    title: {
        type: S.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: S.TEXT,
        defaultValue: "No description"
    },
    rating: {
        type: S.ARRAY(S.JSONB),
        defaultValue: []
        // Objects like: {userId: 1, rating: 5}
    },
    imgUrl: {
        type: S.STRING,
        defaultValue: "https://via.placeholder.com/150",
    },
    price: {
        type: S.INTEGER,
        allowNull: false,
    },
    stock: {
        type: S.INTEGER,
        defaultValue: 0,
    },
    tag: {
        type: S.STRING,
        allowNull: false,
    }
},{hooks:{
    //hooks here
},sequelize, modelName: 'products'});

module.exports = Products;