import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white-100 py-8">
      <div className="md:flex md:justify-center md:space-x-8 md:px-14">
        <Link to="/productos/capsulas">
          <div className="mt-16 py-4 px-4 bg-whit w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div className="w-sm">
              <div className="mt-4 text-black-600 text-center">
                <h1 className="text-m font-bold">CAPSULAS</h1>
                <img
                  className="w-48"
                  src="https://media.istockphoto.com/vectors/coffee-capsule-icon-vector-illustration-vector-id930034248?b=1&k=6&m=930034248&s=170667a&w=0&h=4Jwpdrb28JhAkpbVTviMEChGfQb8AwDrtRUHOYnYJe8="
                  alt=""
                />
              </div>
            </div>
          </div>
        </Link>

        <Link to="/productos/cafetera">
          <div className="mt-16 py-4 px-4 bg-whit w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div className="w-sm">
              <div className="mt-4 text-black-600 text-center">
                <h1 className="text-m font-bold">MAQUINAS</h1>
                <img
                  className="w-48"
                  src="https://us.123rf.com/450wm/rokvel/rokvel1703/rokvel170300602/74641022-m%C3%A1quina-de-caf%C3%A9-simple-icono-de-la-m%C3%A1quina-sobre-un-fondo-blanco.jpg?ver=6"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Link>

        <Link to="/productos/accesorios">
          <div className="mt-16 py-4 px-4 bg-whit w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div className="w-sm">
              <div className="mt-4 text-black-600 text-center">
                <h1 className="text-m font-bold">ACCESORIOS</h1>
                <img
                  className="w-48"
                  src="https://media.istockphoto.com/vectors/coffee-icon-coffee-shop-logo-isolated-on-white-background-vector-id1269139300?b=1&k=20&m=1269139300&s=170667a&w=0&h=p2Z6Vb5_nccGqYVg3zDfdYj3WioIDTUT4YRGACRIxDs="
                  alt=""
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
