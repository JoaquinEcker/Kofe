import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font mt-20 z-50">
      <hr />
      <div className=" container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className=" flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIAS
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="/productos/capsulas" className="text-gray-600 hover:text-gray-800">
                  Cafés
                </Link>
              </li>
              <li>
                <Link to="/productos/cafetera" className="text-gray-600 hover:text-gray-800">
                  Maquinas
                </Link>
              </li>
              <li>
                <Link to="/productos/accesorios" className="text-gray-600 hover:text-gray-800">
                  Accesorios
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              DESARROLLADORES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  href="https://github.com/JoaquinEcker"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Joaco Ecker
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/BigChocolatte"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Lautaro Torres
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AndyTieftrunk"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Andy Tieftrunk
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LucasMaraz"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Lucas Maraz
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              DIRECCION
            </h2>
            <nav className="list-none mb-10">
              <li>
                <p to="" className="text-gray-600 hover:text-gray-800">
                  Calle Aleix, 741
                </p>
              </li>
              <li>
                <p to="" className="text-gray-600 hover:text-gray-800">
                  Bilzen
                </p>
              </li>
              <li>
                <p to="" className="text-gray-600 hover:text-gray-800">
                  Zayas Baja
                </p>
              </li>
              <li>
                <p to="" className="text-gray-600 hover:text-gray-800">
                  23888
                </p>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className=" title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CONTACTO
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link to="" className="text-gray-600 hover:text-gray-800">
                  Facebook
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-gray-800">
                  Twitter
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-gray-800">
                  Linkedlin
                </Link>
              </li>
              <li>
                <Link to="" className="text-gray-600 hover:text-gray-800">
                  E-mail
                </Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            to=""
            className=" flex justify-center title-font font-medium items-center justify-center text-gray-900"
          >
            <i className="fas fa-cubes fa-lg text-purple-500"></i>
            <span className="ml-3 text-xl">Kofe</span>
          </Link>
          <p className="text-center mt-2 text-sm text-gray-500">
            Es una empresa de Café mundialmente conocida por ser uno de los
            lideres en la industria cafetera
          </p>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className=" container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2021 Copyright:
            <Link to="/home" className="text-gray-600 ml-1" target="_blank">
              Kofe Corporation
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
