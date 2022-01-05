import React from "react";
import { GrUserAdmin } from "react-icons/gr";
import { BsCartCheckFill, BsCalendarCheckFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

const CardUser = ({ user }) => {
  const [carritos, setCarritos] = React.useState({});
  const handleUser = () => {
    axios.put(`/user/${user.id}`, { role: "user" });
  };
  const handleAdmin = () => {
    axios.put(`/user/${user.id}`, { role: "admin" });
  };

  React.useEffect(() => {
    axios.get("/purchases").then((data) => setCarritos(data.data));
  }, []);

  return (
    <>
      <div
        className=" bg-white shadow-lg rounded-lg overflow-hidden my-4"
        style={{ width: "595px", marginLeft: "20px", marginRight: "20px" }}
      >
        <div className="flex items-center px-6 py-3 bg-red-900">
          <GrUserAdmin />
          <h1 className="mx-3 text-white font-semibold text-lg">{user.role}</h1>
        </div>
        <div className="py-4 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <div className="flex items-center mt-4 text-gray-700">
            <BsCalendarCheckFill />
            <h1 className="px-2 text-sm">
              Cuenta creada: {user.updatedAt.slice(0, 10)}
            </h1>
          </div>
          <Link to="">
            <div className="flex items-center mt-4 text-gray-700">
              <BsCartCheckFill />
              <h1 className="px-2 text-sm">Compras: {user.id}</h1>
            </div>
          </Link>
          <div className="flex items-center mt-4 text-gray-700">
            <MdEmail />
            <h1 className="px-2 text-sm">{user.email}</h1>
          </div>
          <div className="flex items-center mt-4 text-gray-700">
            {user.role === "admin" ? (
              <button
                className=" bg-red-900 text-gray-200 px-2 py-2 rounded-md "
                onClick={handleUser}
              >
                User
              </button>
            ) : (
              <button
                className=" bg-red-900 text-gray-200 px-2 py-2 rounded-md "
                onClick={handleAdmin}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardUser;
