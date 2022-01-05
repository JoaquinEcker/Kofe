import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShop } from "react-icons/ai";
function EmptyCart() {
  return (
    <div className="flex flex-wrap align-center">
      <div className="container mx-auto mt-20 ">
        <div
          style={{ margin: "150px 15% 0 15%", height: "auto" }}
          className="relative rounded-lg flex flex-col justify-center md:flex-row items-center md:shadow-xl md:h-72 mx-2"
        >
          <div className="z-10 order-2 md:order-1 w-full h-full  justify-center md:w-3/5 flex items-center -mt-6 md:mt-0">
            <div className=" p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
              <h4 className="hidden md:block text-xl text-black mb-2 font-bold ">
                Tu carrito esta vacío
              </h4>
              <Link to="/home">
                <h4
                  style={{ textAlign: "center", color: "#414ED5" }}
                  className="hidden md:block text-xl mb-2 font-bold "
                >
                  Ver productos
                  <div style={{ marginTop: "5px", marginLeft: "45%" }}>
                    <AiOutlineShop />
                  </div>
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
