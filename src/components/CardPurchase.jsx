import React from "react";
import { BsCalendarCheckFill } from "react-icons/bs";

function CardPurchase({ purchase }) {
  return (
    <div className="container mx-auto mt-20">
      <div
        style={{ margin: "0 15%", height: "auto" }}
        className="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2"
      >
        <div className="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
          <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
            <h4 className="hidden md:block text-xl text-gray-400 mb-2">
              Compra
            </h4>
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsCalendarCheckFill />
              <h3 className="hidden md:block font-bold text-2xl text-gray-700 ml-2">
                'Fecha' : {purchase.updatedAt.slice(0, 10)}
              </h3>
            </div>
            <div className="my-5">
              <p className="text-gray-600 text-justify">Productos</p>
              <div>
                {purchase.productArray.map((item, i) => {
                  return (
                    <div key={i}>
                      <ul>
                        <span style={{ fontWeight: "bold" }}>
                          ~ {item.productName}
                        </span>
                        <span style={{ fontStyle: "italic" }}>
                          $ {item.price}
                        </span>
                        <span> - Cantidad: {item.quantity}</span>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr />
            <div className="mt-10 text-xl">
              <span>Total </span>
              <span className="text-m ml-1">&#x279c;</span> $
              {purchase.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPurchase;
