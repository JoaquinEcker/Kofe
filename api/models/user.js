const S = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class Users extends S.Model {
    //model methods with "static" & instance methods only with the function name
    hash = (password, salt) => {
        return bcrypt.hash(password, salt);
    }
}

Users.init({
    name:{
        type: S.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email:{
        type: S.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type:S.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    salt:{
        type:S.STRING
    },
    role:{
        type:S.STRING,
        defaultValue:'user'
    },
    googleId:{
        type:S.STRING,
        defaultValue: ""
    }
},{
    hooks:{
        beforeValidate: (user) => {
            if(user.googleId){
                user.password = "123"; //password is not required for google users
            }
        },
        beforeCreate: (user) => {
            return bcrypt
              .genSalt(12)
              .then((newSalt) => {
                user.salt = newSalt;
                return user.hash(user.password, user.salt)
              })
              .then((hash) => {
                user.password = hash;
              });
        },
        //rehasg the password after changing it
        beforeUpdate: (user) => {
            if(user.changed('password')){
                return bcrypt
                  .genSalt(12)
                  .then((newSalt) => {
                    user.salt = newSalt;
                    return user.hash(user.password, user.salt)
                  })
                  .then((hash) => {
                    user.password = hash;
                  });
            }
        },
        beforeBulkCreate: (users) => {
            return Promise.all(users.map(user => {
                return bcrypt
                  .genSalt(12)
                  .then((newSalt) => {
                    user.salt = newSalt;
                    return user.hash(user.password, user.salt)
                  })
                  .then((hash) => {
                    user.password = hash;
                  });
            }));
              
        }
    },
    sequelize, modelName:'users'
})

module.exports = Users;