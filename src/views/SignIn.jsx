import { CustomHook } from "../hooks/CustomHook";
import { useDispatch } from "react-redux";
import { loginRequest } from "../store/user";
import swal from "sweetalert";

function SignIn() {
  const email = CustomHook("");
  const password = CustomHook("");
  const dispatch = useDispatch();

  const errorAlert = () => {
    swal({
      title: "Login fallido",
      text: "Intentalo nuevamente",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    dispatch(
      loginRequest({ email: email.value, password: password.value, errorAlert })
    );
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8" style={{ marginTop: "200px" }}>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesion
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleLoginClick}
          action="#"
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                {...email}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700  focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Iniciar sesion
            </button>
          </div>
        </form>
        <a href="http://localhost:3001/auth/google">
          <button className=" mt-3 group relative w-full flex justify-center items-center text-center py-1 px-4 border-2 border-grey-900 text-sm font-medium rounded-md text-grey-700 bg-grey-600 hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
            <img
              style={{ width: "20px", height: "20px", display: "flex" }}
              className="mx-1 my-1 flex justify-center items-center"
              src="https://icon-library.com/images/google-login-icon/google-login-icon-24.jpg"
              alt=""
            />
            Iniciar sesion con Google
          </button>
        </a>
      </div>
    </div>
  );
}
export default SignIn;
