import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminContent = () => {
  const user = useSelector((state) => state.user);
  return (
    <header className="bg-white-100 py-8">
      <div className="md:flex md:justify-center md:space-x-8 md:px-14">
        <Link to="/admin/creacion">
          <div className="mt-16 py-4 px-4 bg-whit w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
            <div className="w-sm">
              <div className="mt-4 text-black-600 text-center">
                <h1 className="text-m font-bold">Nuevos Productos</h1>
                <img
                  className="w-48"
                  src="https://i.pinimg.com/originals/af/66/c4/af66c4d3da2646e8a08b42f02cea25d3.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Link>

        {user.role === "superAdmin" ? (
          <Link to="/admin/users">
            <div className="mt-16 py-4 px-4 bg-whit w-60 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
              <div className="w-sm">
                <div className="mt-4 text-black-600 text-center">
                  <h1 className="text-m font-bold">All users</h1>
                  <img
                    style={{ marginLeft: "8px" }}
                    className="w-48"
                    src="https://k2partnering.com/wp-content/uploads/2016/05/Person.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default AdminContent;
