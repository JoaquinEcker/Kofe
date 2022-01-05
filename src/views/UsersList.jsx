import React from "react";
import CardUser from "../components/CardUser";
import axios from "axios";

const UsersList = () => {

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get("/user").then((users) => {
      setUsers(users.data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          height: 100,
        }}
      ></div>
      <div className="flex flex-wrap align-center">
        {users.map((user, i) => {
          return <CardUser user={user} key={i} />;
        })}
      </div>
    </>
  );
};

export default UsersList;
