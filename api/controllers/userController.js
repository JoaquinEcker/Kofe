const Users = require("../models/user");

class UserController {
  //-----------------------------------GET-----------------------------------

  //get all users

  static async getAll(req, res, next) {
    if (Object.keys(req.query).length > 0) {
      if (req.query.id) {
        try {
          const user = await Users.findOne({
            where: {
              id: req.query.id,
            },
          });
         return res.status(200).send(user);
        } catch (err) {
          next(err);
        }
      } else if (req.query.email) {
        try {
          const user = await Users.findOne({
            where: {
              email: req.query.email,
            },
          });
          return res.status(200).send(user);
        } catch (err) {
          next(err);
        }
      } else if (req.query.name) {
        try {
          const user = await Users.findOne({
            where: {
              name: req.query.name,
            },
          });
          return res.status(200).send(user);
        } catch (err) {
          next(err);
        }
      }
      //find all users by role
      else if (req.query.role) {
        try {
          const user = await Users.findAll({
            where: {
              role: req.query.role,
            },
          });
          return res.status(200).send(user);
        } catch (err) {
          next(err);
        }
      }
    } else {
      try {
        const users = await Users.findAll();
        return res.status(200).send(users);
      } catch (err) {
        next(err);
      }
    }
  }

  //get user by id with params

  static async getById(req, res, next) {
    try {
      const user = await Users.findByPk(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }


  static async getByUsernameParams(req, res, next) {
    try {
      const user = await Users.findOne({
        where: {
          username: req.params.username,
        },
      });
      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  //update user by id with params, a user can only update his/her own data

  static async updateUserById(req, res, next) {
    if (req.params.id === req.user.id) {
      try {
        const user = await Users.findByPk(req.params.id);
        await user.update(req.body);
        return res.status(200).send(user);
      } catch (err) {
        next(err);
      }
    }
    else {
      return res.status(403).send("You are not authorized to update this user");
    }
  }

  //delete user by id with query, a user can only delete his/her own data
  static async deleteUserByIdParams(req, res, next) {
    if (req.params.id === req.user.id) {
      try {
        const user = await Users.findByPk(req.params.id);
        await user.destroy();
        return res.status(200).send("User deleted");
      } catch (err) {
        next(err);
      }
    }
    else {
      return res.status(403).send("You are not authorized to delete this user");
    }
  }
}
module.exports = UserController;
