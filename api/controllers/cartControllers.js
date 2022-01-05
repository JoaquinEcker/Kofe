const { Cart, Purchases, Products } = require("../models");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "kofe.tienda@gmail.com",
    pass: "kofeadmin123",
  },
  secure: true,
});

class CartController {
  static async addToCart(req, res, next) {
    try {
      const { id } = req.params; //this is the product id
      const { quantity } = req.body;
      const userId = req.user.id;
      const result = await Cart.addToCart(userId, id, quantity);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCart(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await Cart.getCarts(userId);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { userId } = req.user.id;
      const result = await Cart.deleteCart(userId);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteIndividualProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Cart.destroy({
        where: {
          id : id,
        },
      });
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //send a mail with nodemailer to the user with the purchase details on checkout

  static async checkout(req, res, next) {
    try {
      const userId = req.user.id;
      const carts = await Cart.getCarts(userId);
      const cart = carts.map((cart) => {
        return {
          productId: cart.productId,
          quantity: cart.quantity,
          price: cart.price,
          productName: cart.productName,
        };
      });
      const expandedCartPromises = cart.map((cart) => {
        return Products.findByPk(cart.productId);
      });
      const expandedCart = await Promise.all(expandedCartPromises);
      const expandedCartWithQuantity = expandedCart.map((product, index) => {
        return {
          product,
          title: product.title,
          quantity: cart[index].quantity,
          price: product.price,
          total: product.price * cart[index].quantity,
          tag: product.tag,
        };
      });
      //price total of the cart
      const total = expandedCartWithQuantity.reduce((acc, curr) => {
        return acc + curr.total;
      }, 0);

      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido).toLocaleDateString();
      const html = expandedCartWithQuantity.map((e) => {
        return `
        <ul style="color:black">
          <li style="color:black"><span style="font-weight:bold" >Producto: </span> <span style="font-style:italic">${e.title}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Tipo: </span> <span style="font-style:italic">${e.tag}</span></li>
          <li style="color:black"><span style="font-weight:bold">Cantidad de items: </span> <span style="font-style:italic">${e.quantity}</span></li>
          <li style="color:black"><span style="font-weight:bold">Precio unitario: </span> <span style="font-style:italic">$${e.price}</span></li>
          <li style="color:black"><span style="font-weight:bold">Precio total: </span> <span style="font-style:italic">$${e.total}</span></li>
        </ul>
        <hr>
          `;
      });

      const mailData = {
        from: "kofe.tienda@gmail.com", // sender address
        to: `${req.user.email}`, // list of receivers
        subject: "Order info from Kofe!",
        text: "Hope you enjoyed the page!", //invisible text
        html: `<div style="background-color:gainsboro; padding:30px; border-radius:10px">
        <h2 style="color:black">Querido ${
          req.user.name
        }, su compra ha sido completada con exito!</h2>
        <h3 style="color:black">Fecha de compra: ${hoy}</h3>
        <h4 style="color:black">Orden de compra: </h4>
          ${html.join("")}
        <h4>Precio total de la orden: $${total}</h4>
        <hr>
        <h4>informacion del envio: </h4>
        <ul style="color:black">
          <li style="color:black"><span style="font-weight:bold" >Nombre del Recipiente: </span> <span style="font-style:italic">${req.body.nombreCompleto || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Codigo Postal: </span> <span style="font-style:italic">${req.body.codigoPostal || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Direccion: </span> <span style="font-style:italic">${req.body.direccion || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Altura: </span> <span style="font-style:italic">${req.body.altura || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Piso: </span> <span style="font-style:italic">${req.body.piso || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Departamento: </span> <span style="font-style:italic">${req.body.departamento || "No especificado"}</span></li>
          <li style="color:black"><span style="font-weight:bold" >Telefono: </span> <span style="font-style:italic">${req.body.telefono || "No especificado"}</span></li>
        </ul>
        <hr>
        <h5>Gracias por su compra!</h5>
        </div>`,
      };
      const result = await Purchases.create({
        userId: userId,
        productArray: cart,
      });
      await Cart.checkout(userId);
      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      //send email
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
