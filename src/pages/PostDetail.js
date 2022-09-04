import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils";

const PostDetail = ({ match }) => {
  let { postId } = useParams();
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId, getRandomImages);
  }, [postId]);

  const getPostById = (id, callback) => {
    axios
      .get(`http://localhost:8000/api/v1/posts/${id}`)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => console.log(err));
    callback();
  };

  const getRandomImages = () => {
    axios
      .get("https://source.unsplash.com/random/300x300/?landscape")
      .then((res) => {
        const { config } = res;
        setImage(config.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <h1 className="text-center text-3xl font-bold mt-6 text-black dark:text-white">
        Detail Article
      </h1>
      <div className="flex flex-col items-center justify-center">
        {data && (
          <div className="w-80 rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-100 dark:bg-gray-900">
            {image !== "" && (
              <img className="w-full" src={image} alt="landscape view" />
            )}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-200">
                {capitalizeFirstLetter(data.title)}
              </div>
              <p className="text-gray-800 dark:text-gray-200 text-base">
                {data.description}
              </p>
            </div>
          </div>
        )}
        {cookies.accessToken !== "undefined" && (
          <>
            <div
              className="w-80"
              onClick={() => {
                navigate("edit-post", {
                  state: {
                    // id: postId,
                    post: data,
                    modalOpen: true,
                  },
                });
              }}
            >
              <div className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 rounded focus:outline-none focus:shadow-outline">
                Edit Article
              </div>
              {/* </Link> */}
            </div>
            <Outlet />
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
