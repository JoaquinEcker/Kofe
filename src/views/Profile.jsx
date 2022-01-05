import React from "react";
import CardPurchase from "../components/CardPurchase";
import axios from "axios";
const Profile = () => {
  //   const user = useSelector((state) => state.user);

  const [userPurchases, setUserPurchases] = React.useState([]);

  React.useEffect(() => {
    axios.get("/purchases").then((purchases) => {
      setUserPurchases(purchases.data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          height: 100,
        }}
      ></div>
      {userPurchases[0] ? (
        <div className="flex flex-wrap align-center">
          {userPurchases.map((purchase, i) => {
            return <CardPurchase purchase={purchase} key={i} />;
          })}
        </div>
      ) : (
        <div className="flex flex-wrap align-center">
          <div className="container mx-auto mt-20 ">
            <div
              style={{ margin: "0 15%", height: "auto" }}
              className="relative rounded-lg flex flex-col justify-center md:flex-row items-center md:shadow-xl md:h-72 mx-2"
            >
              <div className="z-10 order-2 md:order-1 w-full h-full  justify-center md:w-3/5 flex items-center -mt-6 md:mt-0">
                <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                  <h4 className="hidden md:block text-xl text-black mb-2 font-bold">
                    En esta sección figurarán todas tus compras
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
