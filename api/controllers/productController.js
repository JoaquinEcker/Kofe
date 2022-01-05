const Products = require("../models/product");
const S = require("sequelize");

//dialect: sequelize
class ProductController {
  //----------------------GET ROUTES---------------------

  static getAll(req, res, next) {
    Products.findAll()
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }

  static getById(req, res, next) {
    Products.findByPk(req.params.id)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch((err) => next(err));
  }

  static getByTag(req, res, next) {
    Products.findAll({
      where: {
        tag: req.params.tag,
      },
    })
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }

  static getByTitle(req, res, next) {
    const title = req.params.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    Products.findAll({
      where: {
        title: {
          [S.Op.like]: `%${title}%`,
        },
      },
    })
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }

  static getByTitleAndTag(req, res, next) {
    const { title, tag } = req.params;
    Products.findAll({
      where: {
        title: {
          [S.Op.like]: `%${title}%`,
        },
        tag,
      },
    })
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }
  static async getByTitleAndDescription(req, res, next) { //try with or operator
    const search = req.params.search
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const result1 = await Products.findAll({
      where: {
        title: {
          [S.Op.like]: `%${search}%`,
        },
      },
    });
    const result2 = await Products.findAll({
      where: {
        description: {
          [S.Op.like]: `%${search}%`,
        },
      },
    });
    //concat the results and eliminate duplicates
    const finalResult = result1.concat(result2).filter((item, index, self) => {
      return self.findIndex((t) => t.id === item.id) === index;
    });

    res.status(200).send(finalResult);
  }

  static getByDescription(req, res, next) {
    //take the accent mark out of the string
    const description = req.params.description
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    Products.findAll({
      where: {
        description: {
          [S.Op.like]: `%${description}%`,
        },
      },
    })
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }

  static getByPriceAndTag(req, res, next) {
    const { min, max } = req.params;
    Products.findAll({
      where: {
        price: {
          [S.Op.between]: [min, max],
        },
        tag: req.params.tag,
      },
    })
      .then((products) => {
        res.status(200).send(products);
      })
      .catch((err) => next(err));
  }

  static getRatings(req, res, next) {
    Products.findByPk(req.params.id).then((product) => {
      res.status(200).send(product.rating);
    });
  }

  //----------------------PUT ROUTES---------------------

  static addRating(req, res, next) {
    const { rating } = req.body;
    const userId = req.user.id;
    const rate = {
      // create a new object to store the rating
      rating,
      userId,
    };
    Products.findByPk(req.params.id).then((product) => {
      const rated = product.rating.find((rate) => rate.userId === userId);
      if (rated) {
        //if the user has already rated the product update the rating
        Products.update(
          {
            rating: product.rating.map((rate) => {
              if (rate.userId === userId) {
                rate.rating = rating;
              }
              return rate;
            }),
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
          }
        ).then((product) => {
          return res.status(200).send(product[1][0]);
        });
      } else {
        //if the user has not rated the product add the rating
        Products.update(
          {
            rating: [...product.rating, rate],
          },
          {
            where: {
              id: req.params.id,
            },
            returning: true,
          }
        )
          .then((product) => {
            return res.status(201).send(product[1][0]);
          })
          .catch((err) => next(err));
      }
    });
  }

  static removeRating(req, res, next) {
    Products.findByPk(req.params.id).then((product) => {
      const rating = product.rating.filter(
        (rate) => rate.userId !== req.user.id
      );
      Products.update(
        {
          rating,
        },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      )
        .then((product) => {
          return res.status(200).send(product[1][0]);
        })
        .catch((err) => next(err));
    });
  }

  static getRatingAverage(req, res, next) {
    Products.findByPk(req.params.id).then((product) => {
      const rating = product.rating.reduce((acc, rate) => {
        return acc + rate.rating;
      }, 0);

      res.status(200).send(`${rating / product.rating.length}`);
    });
  }

  //----------------------POST ROUTES---------------------||ADMIN ONLY||

  static createProduct(req, res, next) {
    Products.create(req.body)
      .then((product) => {
        return res.status(201).send(product);
      })
      .catch((err) => next(err));
  }

  //----------------------PUT ROUTES---------------------||ADMIN ONLY||

  static updateProduct(req, res, next) {
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

  //----------------------DELETE ROUTES---------------------||ADMIN ONLY||

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
}

module.exports = ProductController;
