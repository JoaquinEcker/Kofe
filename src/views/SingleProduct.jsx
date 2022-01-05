import React, { useState } from "react";
import axios from "axios";
import { useLocation, Link, useHistory } from "react-router-dom";
import AddComment from "../components/AddComment";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import { useCart } from "react-use-cart";
import swal from "sweetalert";
import { BsFillCartPlusFill } from "react-icons/bs";
import StarRating from "../components/StarRating/StarRating";

const SingleProduct = () => {
  const history = useHistory();
  const id = useLocation().pathname.slice(10);
  const user = useSelector((state) => state.user);
  const [productos, setProductos] = React.useState([]);
  const [rating, setRating] = useState();
  const { addItem } = useCart();

  const successAlert = () => {
    swal({
      title: "Producto agregado al carrito!",
      icon: "success",
      timer: "1500",
    });
  };

  const addItemBack = () => {
    axios.post(`/cart/${id}`, {
      quantity: 1,
    });
  };

  const addItems = (productos) => {
    if (user.name) addItemBack(productos);
    addItem(productos);
    successAlert();
  };

  React.useEffect(() => {
    axios
      .get(`/product/${id}`)
      .then((res) => res.data)
      .then((byTag) => setProductos(byTag))
      .catch((err) => console.log(err));

    axios
      .get(`/product/${id}/average`)
      .then((res) => res.data)
      .then((stars) => setRating(Math.floor(stars)));
  }, []);


  const handleDelete = () => {
    axios
      .delete(`/admin/products/${id}`)
      .then(history.push(`/productos/${productos.tag}`));
  };

  return (
    <>
      <div
        style={{
          height: 150,
        }}
      ></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row"
          style={{ marginLeft: "482px" }}
        >
          <div className="w-full md:w-2/5 h-80">
            <img
              className="object-center object-cover w-full h-full"
              src={productos.imgUrl}
              alt={productos.title}
            />
          </div>
          <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
            <p className="text-xl text-gray-700 font-bold">{productos.title}</p>
            <div style={{ pointerEvents: "none" }}>
              <StarRating
                count={5}
                size={20}
                value={rating ? rating : "Sin valoraciones"}
                activeColor={"brown"}
                inactiveColor={"#ddd"}
              />
            </div>
            <p className="text-base leading-relaxed text-gray-500 font-normal">
              {productos.description}
            </p>
            <div>
              <div
                style={{
                  display: "flex",

                  marginTop: "7%",
                }}
              >
                <button
                  id="add"
                  style={{ marginLeft: "3%" }}
                  onClick={() => {
                    return addItems(productos);
                  }}
                  className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-blue-600 hover:text-white border-2 border-blue-600 focus:outline-none"
                >
                  <BsFillCartPlusFill />
                </button>
                {user.role === "admin" || user.role === "superAdmin" ? (
                  <Link to={`/edicion/${id}`}>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-green-500 hover:text-white border-2 border-green-500	 focus:outline-none"
                    >
                      editar
                    </button>
                  </Link>
                ) : null}
                {user.role === "admin" || user.role === "superAdmin" ? (
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete()}
                    className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-red-600 hover:text-white border-2 border-red-600	 focus:outline-none"
                  >
                    eliminar
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }} />
      <hr />

      <Comments />

      <AddComment />
    </>
  );
};

export default SingleProduct;
