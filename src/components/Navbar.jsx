import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequest } from "../store/user";

function Navbar() {
  const logout = () => dispatch(logoutRequest());
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <nav
        style={{ width: "100%" }}
        className="z-40 fixed flex items-center justify-between flex-wrap bg-black p-6 filter drop-shadow-lg"
      >
        <Link to="/home">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">Kofe</span>
          </div>
        </Link>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow"></div>

          <div>
            
            {user.name ? (
              <div className="flex">
                <div className="navbar-item text-white">
                  <Link to="/profile">
                    <p style={{ marginRight: "10px", paddingTop: "2.5px" }}>
                      {user.name}
                    </p>
                  </Link>
                </div>
                {user.role !== 'user' ? <Link to="/admin">
                  <button
                    type="primary"
                    size="large"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
                    style={{ marginRight: "10px" }}
                  >
                    Admin
                  </button>
                </Link> : null}

                <Link to="/home">
                  <button
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button
                    type="primary"
                    size="large"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
                    style={{ marginRight: "10px" }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="primary"
                    size="large"
                    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
          <Link to="/cart">
            <button style={{ display: "flex", margin: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
