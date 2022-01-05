import { Link, useHistory } from "react-router-dom";
import { MdCoffeeMaker } from "react-icons/md";
import { GiCoffeeBeans, GiCoffeePot } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { CustomHook } from "../hooks/CustomHook";
import { useDispatch } from "react-redux";
import { searchRequest } from "../store/search";
const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = CustomHook("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchRequest(search.value));
  };

  const reloadCafetera = () => {
    history.push("/productos/cafetera");
    window.location.reload(true);
  };
  const reloadAccesorios = () => {
    history.push("/productos/accesorios");
    window.location.reload(true);
  };
  const reloadCapsulas = () => {
    history.push("/productos/capsulas");
    window.location.reload(true);
  };

  return (
    <>
      <div className=" fixed flex flex-col w-64 h-screen px-4 py-8 bg-white border-r z-10 dark:bg-gray-800 dark:border-gray-600">
        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <BiSearchAlt2 />
          </span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className=" w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Buscar productos"
              {...search}
            />
          </form>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link
              className=" flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/productos/cafetera"
              onClick={reloadCafetera}
            >
              <MdCoffeeMaker />
              <span className="mx-4 font-medium">Cafeteras</span>
            </Link>

            <Link
              onClick={reloadCapsulas}
              className=" flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/productos/capsulas"
            >
              <GiCoffeeBeans />
              <span className="mx-4 font-medium">Capsulas</span>
            </Link>

            <Link
              className=" flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
              to="/productos/accesorios"
              onClick={reloadAccesorios}
            >
              <GiCoffeePot />
              <span className="mx-4 font-medium">Accesorios</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
