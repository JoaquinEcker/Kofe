import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Comments() {
  const [userComment, setUserComment] = useState([]);
  const productId = useLocation().pathname.slice(10);

  React.useEffect(() => {
    axios.get(`/comment/${productId}`).then((res) => setUserComment(res.data));
  }, []);

  return (
    <div>
      {userComment[0] ? (
        userComment.map((comment, i) => {
          return (
            <div className="flex mx-auto items-center justify-center border-2  mt-5 mx-8 mb-4 max-w-lg" key={i}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="flex w-full md:w-full px-3 mb-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="px-4 pt--2 pb-2 text-gray-800 text-lg ">
                    {comment.user.name}
                  </h2>
                </div>
                <div
                  style={{
                    marginLeft: "6px",
                    backgroundColor: "#F2F2F2",
                    borderRadius: "7px",
                  }}
                  className="w-full md:w-full px-3 mb-2 mt-2"
                >
                  {comment.content}
                </div>
                <div className="w-full md:w-full flex items-start md:w-full px-3">
                  <div
                    style={{ fontSize: "13px" }}
                    className="flex items-start w-1/2 text-gray-700 px-2 mr-auto"
                  >
                    {comment.updatedAt.slice(0, 10)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{ marginTop: "5%", fontStyle: "italic" }}
          className="flex mx-auto items-center justify-center shadow-lg mt-5 mx-8 mb-4 max-w-lg"
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt--2 pb-2 text-gray-800 text-lg ">
              Sin reseñas aún
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
