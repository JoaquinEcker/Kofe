import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PutProducts = () => {
  const id = useLocation().pathname.slice(9);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [stock, setStock] = React.useState("");

  React.useEffect(() => {
    axios.get(`/product/${id}`).then((product) => {
      setDescription(product.data.description);
      setImgUrl(product.data.imgUrl);
      setPrice(product.data.price);
      setTitle(product.data.title);
      setTag(product.data.tag);
      setStock(product.data.stock)
    });
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeStock = (e) => {
    setStock(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangeImgUrl = (e) => {
    setImgUrl(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = () => {
    axios.put(`/admin/products/${id}`, {
      title: title,
      description: description,
      imgUrl: imgUrl,
      price: price,
      tag: tag,
      stock: stock,
    });
  };

  return (
    <>
      <div
        style={{
          height: 200,
        }}
      ></div>

      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Cambiar a tu producto
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Nombre del Producto
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="Titulo"
                        onChange={onChangeTitle}
                        value={title}
                      />
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Categoria
                      </label>
                      <div className="flex-shrink w-full inline-block relative">
                        <select
                          onChange={onChangeTag}
                          value={tag}
                          className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        >
                          <option>Capsulas</option>
                          <option>Cafetera</option>
                          <option>Accesorios</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Precio
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="0.00"
                        onChange={onChangePrice}
                        value={price}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Stock
                      </label>
                      <input
                        type="number"
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="Stock"
                        onChange={onChangeStock}
                        value={stock}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Imagen
                      </label>
                      <input
                        type="text"
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        placeholder="URL"
                        onChange={onChangeImgUrl}
                        value={imgUrl}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Descripcion
                      </label>
                      <textarea
                        onChange={onChangeDescription}
                        value={description}
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      ></textarea>
                    </div>
                    <button
                      className="bg-blue-600 text-gray-200 px-2 py-2 rounded-md"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PutProducts;
