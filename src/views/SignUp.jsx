import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CustomHook } from "../hooks/CustomHook";
import axios from "axios";
import swal from "sweetalert";

const SignUp = () => {
  const name = CustomHook("name");
  const email = CustomHook("email");
  const password = CustomHook("password");
  const confirmPassword = CustomHook("confirmPassword");
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});

  const successAlert = () => {
    swal({
      title: "Registro exitoso!",
      text: "Logueate para continuar",
      icon: "success",
      timer: "2000",
    });
  };

  const errorAlert = () => {
    swal({
      title: "Registro fallido",
      text: "Intentalo nuevamente",
      button: "Aceptar",
      icon: "error",
    });
  };

  const handleFormValidation = () => {
    let formIsValid = true;

    if (!name.value) {
      formIsValid = false;
      setFormErrors({ ...formErrors, nameErr: "Ingrese un nombre" });
    }

    if (!email.value) {
      formIsValid = false;
      setFormErrors({ ...formErrors, emailErr: "Ingrese un email" });
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
    ) {
      formIsValid = false;
      setFormErrors({ ...formErrors, emailErr: "Ingrese un email valido" });
    }

    if (password.value.length <= 5) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        passwordLengthErr: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    if (password.value !== confirmPassword.value) {
      formIsValid = false;
      setFormErrors({
        ...formErrors,
        confirmPasswordErr: "Las contraseñas deben coincidir",
      });
    }

    return formIsValid;
  };

  const {
    nameErr,
    emailErr,
    passwordLengthErr,
    confirmPasswordErr,
    nameExistsErr,
  } = formErrors;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!handleFormValidation()) {
      errorAlert();
    }

    if (handleFormValidation()) {
      axios
        .post("/auth/register", {
          name: name.value,
          email: email.value,
          password: password.value,
        })
        .then((res) => res.data)
        .then(successAlert())
        .then(setTimeout(() => history.push("/login"), 2200));
    }
  };

  return (
    <>
      <div className=" bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-64 pr-48">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-screen w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="-mr-2 flex items-center md:hidden"></div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8"></div>
              </nav>
            </div>

            <div
              focus
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div className="-mr-2"></div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1"></div>
              </div>
            </div>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Registrate</h1>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                    action="#"
                    method="POST"
                  >
                    <input
                      className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      type="name"
                      placeholder="Nombre completo"
                      {...name}
                    />
                    {nameErr ? (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "red",
                          height: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {nameErr}
                      </div>
                    ) : (
                      ""
                    )}
                    {nameExistsErr ? (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "red",
                          height: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {nameExistsErr}
                      </div>
                    ) : (
                      ""
                    )}

                    <input
                      {...email}
                      type="text"
                      className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      name="email"
                      placeholder="Email"
                    />
                    {emailErr ? (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "red",
                          height: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {emailErr}
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      {...password}
                      type="password"
                      className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      name="password"
                      placeholder="Contraseña"
                    />
                    {passwordLengthErr ? (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "red",
                          height: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {passwordLengthErr}
                      </div>
                    ) : (
                      ""
                    )}
                    <input
                      {...confirmPassword}
                      type="password"
                      className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      name="confirmPassword"
                      placeholder="Confirmar contraseña"
                    />
                    {confirmPasswordErr ? (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "red",
                          height: "5px",
                          marginTop: "2px",
                        }}
                      >
                        {confirmPasswordErr}
                      </div>
                    ) : (
                      ""
                    )}

                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700  focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Crear una cuenta
                    </button>
                  </form>
                  <a href="http://localhost:3001/auth/google">
                    <button className=" mt-3 group relative w-full flex justify-center items-center text-center py-1 px-4 border-2 border-grey-900 text-sm font-medium rounded-md text-grey-700 bg-grey-600 hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-grey-500">
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "flex",
                        }}
                        className="mx-1 my-1 flex justify-center items-center"
                        src="https://icon-library.com/images/google-login-icon/google-login-icon-24.jpg"
                        alt=""
                      />
                      Registrate con Google
                    </button>
                  </a>
                </div>

                <div className="text-grey-dark mt-6">
                  <Link
                    className="no-underline border-b border-blue text-blue"
                    to="../login"
                  >
                    Ya tienes una cuenta? Loggeate
                  </Link>
                </div>
                
              </div>
            </main>
          </div>
        </div>
        <div
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          style={{ marginTop: 100 }}
        >
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://www.wallpapertip.com/wmimgs/85-859036_coffee-hd.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
