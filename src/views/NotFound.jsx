import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <br />
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Lo sentimos, no pudimos encontrar la página solicitada.
          </p>
          <br />
          <p className="mb-8">
            No te preocupes, podes encontrar muchas otras cosas en nuestra
            homepage, mientras disfrutas un café.
          </p>
          <Link to="/home">
            <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
              Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
