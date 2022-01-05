const { Products, Users } = require("../models");

class AdminController {
  //------------------PRODUCTS------------------

  //admins and superadmins can update, add or delete products

  static createProduct(req, res, next) {
    Products.create(req.body)
      .then((product) => {
        return res.status(201).send(product);
      })
      .catch((err) => next(err));
  }

  static updateProduct(req, res, next) {
    console.log(req.body)
    Products.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        return res.status(200).send(product);
      })
      .catch((err) => next(err));
  }

  static deleteProduct(req, res, next) {
    Products.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((product) => {
        return res.status(200).send(product);
      })
      .catch((err) => next(err));
  }

  //------------------USERS------------------

  //create user

  static async createUser(req, res, next) {
    try {
      //you cant create a superadmin
      if (req.body.role === "superAdmin") {
        return res.status(403).send({
          message: "You can't create a superadmin",
        });
      }
      //you cant create an admin neither
      if (req.body.role === "admin") {
        return res.status(403).send({
          message: "You can't create an admin, only update an user role",
        });
      }
      const user = await Users.create(req.body);
      return res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }

  static async updateUserByIdParams(req, res, next) {
    try {
      const user = await Users.findByPk(req.params.id);
      //if you are not superadmin you cant update the roles
      if (req.user.role !== "superAdmin" && req.body.role) {
        return res.status(403).send({
          message: "You can't update the roles",
        });
      }
      //you cant update the role of a superadmin or to a superadmin, even if you are superadmin
      if (req.body.role === "superAdmin") {
        return res.status(403).send({
          message: "You can't update the role of/to a superadmin",
        });
      }
      //users cant update data of other users
      if (user.id !== req.user.id && req.user.role !== "superAdmin") {
        return res.status(403).send({
          message: "You can't update the data of other users",
        });
      }

      //
      await user.update(req.body);
      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  //delete user by id with params
  static async deleteUserByIdParams(req, res, next) {
    try {
      const user = await Users.findByPk(req.params.id);
      //if you are not superadmin you cant delete users
      if ((user.role === "admin" || user.role === "user") && req.body.role) {
        return res.status(403).send({
          message: "You can't delete users",
        });
      }
      //you cant delete a superadmin
      if (user.role === "superAdmin") {
        return res.status(403).send({
          message: "You can't delete a superadmin",
        });
      }
      await user.destroy();
      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdminController;
