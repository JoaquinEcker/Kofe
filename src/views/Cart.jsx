import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { CustomHook } from "../hooks/CustomHook";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import swal from "sweetalert";


const Cart = () => {
  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const nombreCompleto = CustomHook("");
  const codigoPostal = CustomHook("");
  const telefono = CustomHook("");
  const direccion = CustomHook("");
  const altura = CustomHook("");
  const piso = CustomHook("");
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    axios.get("/cart").then((data) => setCart(data.data));
  }, []);

  const handleClick = (id) => {
    axios.delete(`/cart/individual/${id}`).then(removeItem(id));
  };

  const checkout = () => {
    JSON.parse(localStorage["react-use-cart"]).items.map((item) => {
      return axios.post(`/cart/${item.id}`, { quantity: item.quantity });
    });
    user.name
      ? axios
          .post("/cart/checkout", {
            nombreCompleto: nombreCompleto.value,
            codigoPostal: codigoPostal.value,
            telefono: telefono.value,
            direccion: direccion.value,
            altura: altura.value,
            piso: piso.value,
          })
          .then(successAlert())
          .then(localStorage.clear())
          .then(history.push("/home"))
      : history.push("/login");
  };

  if (isEmpty) return <EmptyCart />;

  const successAlert = () => {
    swal({
      title: "Éxito!",
      text: "Compra realizada, pronto!",
      icon: "success",
      button: "Aceptar",
    });
  };

  return (
    <>
      <div className="h-screen bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
            <div className="md:flex ">
              <div
                className="w-full p-4 px-5 py-5"
                style={{ marginTop: "40px" }}
              >
                <div className="md:grid md:grid-cols-3 gap-2 ">
                  <div className="col-span-2 p-5">
                    <h1 className="text-xl font-medium font-bold ml-3">
                      Carrito: ({totalItems})
                    </h1>

                    {items.map((items, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center mt-6 pt-6"
                        >
                          <div className="flex items-center">
                            <img
                              src={items.imgUrl}
                              width="60"
                              className="rounded-full "
                              alt="KofeStoreProduct"
                            />
                            <div className="flex flex-col ml-3">
                              <span className="md:text-md font-medium">
                                {items.title}
                              </span>
                              <span className="text-xs font-light text-gray-400">
                                {items.tag}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="pr-8 flex ">
                              <button
                                onClick={() =>
                                  updateItemQuantity(
                                    items.id,
                                    items.quantity - 1
                                  )
                                }
                                className="font-semibold"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
                                value={items.quantity}
                              />
                              <button
                                onClick={() =>
                                  updateItemQuantity(
                                    items.id,
                                    items.quantity + 1
                                  )
                                }
                                className="font-semibold"
                              >
                                +
                              </button>
                            </div>
                            <div className="pr-8 ">
                              <span className="text-xs font-medium">
                                ${items.price * items.quantity}
                              </span>
                            </div>
                            <div className="pr-8 ">
                              <button
                                style={{ paddingTop: "8px" }}
                                onClick={() => handleClick(items.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <i className="fa fa-close text-xs font-medium"></i>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                      <div className="flex items-center">
                        <i className="fa fa-arrow-left text-sm pr-2"></i>
                        <Link to="/home">
                          <span className="text-md font-medium text-blue-500">
                            Seguir comprando
                          </span>
                        </Link>
                      </div>
                      <div className="flex justify-center items-end">
                        <span className="text-sm font-medium text-gray-400 mr-1">
                          Subtotal:
                        </span>
                        <span className="text-lg font-bold text-gray-800 ">
                          ${cartTotal}
                        </span>
                      </div>
                      <div className="flex justify-center items-end">
                        <button
                          onClick={() => emptyCart()}
                          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                        >
                          Vaciar carrito
                        </button>
                      </div>
                    </div>
                  </div>
                  <form
                    className=" p-5 bg-gray-800 rounded overflow-visible"
                    onSubmit={checkout}
                  >
                    <span className="text-xl font-medium text-gray-100 block pb-3">
                      Datos de envío
                    </span>

                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Nombre y apellido
                      </label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        {...nombreCompleto}
                      />
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        {...codigoPostal}
                      />
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">Telefono</label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        {...telefono}
                      />
                    </div>
                    <div className="flex justify-center flex-col pt-3">
                      <label className="text-xs text-gray-400 ">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                        {...direccion}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                      <div className="">
                        <label className="text-xs text-gray-400">Altura</label>
                        <input
                          type="text"
                          className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                          {...altura}
                        />
                      </div>
                      <div className="col-span-2 ">
                        <label className="text-xs text-gray-400">
                          Piso
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            {...piso}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      className="mt-4 h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                      type="submit"
                    >
                      Check Out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
