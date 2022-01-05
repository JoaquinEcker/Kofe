import React from "react";
import { threeProducts } from "../utils/functions";
import axios from "axios";
import { Link } from "react-router-dom";
const Content = () => {
  const [tresProductos, setTresProductos] = React.useState({});

  React.useEffect(() => {
    axios
      .get("/product")
      .then((info) => setTresProductos(threeProducts(info.data)));
  }, []);

  return (
    <>
      <div className="w-full bg-gray-400">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
              Productos para vos
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(tresProductos) ? (
              <>
                <Link to={`/producto/${tresProductos[0].id}`}>
                  <div className="w-full bg-white rounded-lg shadow-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                      <img
                        className="object-center object-cover rounded-full h-36 w-36"
                        src={tresProductos[0].imgUrl}
                        alt={tresProductos[0].title}
                      />
                    </div>
                    <div className="text-center">
                    {tresProductos[0].title.length > 22 ? (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[0].title.slice(0,22)}...
                        </p>
                      ) : (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[0].title}
                        </p>
                      )}
                      <p className="text-base text-gray-400 font-normal">
                        #{tresProductos[0].tag}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              "undefined"
            )}

            {Array.isArray(tresProductos) ? (
              <>
                <Link to={`/producto/${tresProductos[1].id}`}>
                  <div className="w-full bg-white rounded-lg shadow-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                      <img
                        className="object-center object-cover rounded-full h-36 w-36"
                        src={tresProductos[1].imgUrl}
                        alt={tresProductos[1].title}
                      />
                    </div>
                    <div className="text-center">
                    {tresProductos[1].title.length > 22 ? (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[1].title.slice(0,22)}...
                        </p>
                      ) : (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[1].title}
                        </p>
                      )}
                      <p className="text-base text-gray-400 font-normal">
                        #{tresProductos[1].tag}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              "undefined"
            )}
            {Array.isArray(tresProductos) ? (
              <>
                <Link to={`/producto/${tresProductos[2].id}`}>
                  <div className="w-full bg-white rounded-lg shadow-lg p-12 flex flex-col justify-center items-center">
                    <div className="mb-8">
                      <img
                        className="object-center object-cover rounded-full h-36 w-36"
                        src={tresProductos[2].imgUrl}
                        alt={tresProductos[2].title}
                      />
                    </div>
                    <div className="text-center">
                    {tresProductos[2].title.length > 22 ? (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[2].title.slice(0,22)}...
                        </p>
                      ) : (
                        <p className="text-xl text-yellow-900 font-bold mb-2">
                          {tresProductos[2].title}
                        </p>
                      )}
                      <p className="text-base text-gray-400 font-normal">
                        #{tresProductos[2].tag}
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              "undefined"
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Content;
