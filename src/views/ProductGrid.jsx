import React from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/functions";
import Sidebar from "../components/Sidebar";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import StarRating from "../components/StarRating/StarRating";
import ReactPaginate from "react-paginate";
import { useCart } from "react-use-cart";
import swal from "sweetalert";

const ProductGrid = () => {
  const [productos, setProductos] = React.useState([]);
  const tag = capitalizeFirstLetter(useLocation().pathname.slice(11));
  const search = useSelector((state) => state.search);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [cantidad, setCantidad] = React.useState(1);
  const { addItem } = useCart();

  const addItems = (id) => {
    axios.post(`/cart/${id}`, {
      quantity: cantidad,
    });

    axios
      .get(`/product/${id}`)
      .then((res) => addItem(res.data))
      .then(successAlert());
  };

  const successAlert = () => {
    swal({
      title: "Producto agregado al carrito!",
      icon: "success",
      timer: "1500",
    });
  };

  React.useEffect(() => {
    axios
      .get(`/product/tag/${tag}`, {
        search: tag,
      })
      .then((res) => res.data)
      .then((byTag) => setProductos(byTag))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    setProductos(search);
  }, [search]);

  const productsPerPage = 6;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = productos
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((item, i) => {
      return (
        <div
          className="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64"
          key={i}
        >
          <img
            className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6"
            src={item.imgUrl}
            alt="bag"
          />
          <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
            <div style={{ pointerEvents: "none" }}>
              <StarRating
                count={5}
                size={20}
                value={
                  item.rating[0]
                    ? Math.floor(
                        item.rating.reduce((acc, rate) => {
                          return acc + rate.rating;
                        }, 0) / item.rating.length
                      )
                    : "Sin valoraciones"
                }
                activeColor={"brown"}
                inactiveColor={"#ddd"}
              />
            </div>
            <div className="flex items-center">
              <h2 className="text-xl text-gray-800 font-medium mr-auto">
                {item.title}
              </h2>
              <p className="text-gray-800 font-semibold tracking-tighter">
                ${item.price}
              </p>
            </div>
            {item.description.length > 203 ? (
              <p className="text-sm text-gray-700 mt-4">
                {item.description.slice(0, 203)}...
              </p>
            ) : (
              <p className="text-sm text-gray-700 mt-4">{item.description}</p>
            )}
            <div className="flex items-center justify-end mt-4 top-auto">
              <button
                className=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md "
                style={{ marginRight: "10px" }}
                onClick={() => addItems(item.id)}
              >
                <BsFillCartPlusFill />
              </button>

              <Link to={`/producto/${item.id}`}>
                <button className=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">
                  Ver producto
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(productos.length / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div
        style={{
          height: 50,
        }}
      ></div>
      <Sidebar />
      {displayProducts}
      <ReactPaginate
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationButtons"}
        previousLinkClassName={"previousButton"}
        nextClassName={"nextButton"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </>
  );
};

export default ProductGrid;
