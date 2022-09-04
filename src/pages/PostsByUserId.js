import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import { useCookies } from "react-cookie";

const PostsByUserId = () => {
  const [data, setData] = useState([]);
  const [cookies] = useCookies(["accessToken", "userId"]);
  const userId = cookies.userId.id;

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    axios
      .get(`http://localhost:8000/api/v1/posts?writer=${userId}&size=10`, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => console.log(err));
  };
  if (cookies.accessToken !== "undefined" && cookies.userId !== "undefined") {
    return (
      <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <h1 className="text-center text-3xl font-bold mt-6 text-black dark:text-white">
          Article List
        </h1>
        {data.length > 0 ? (
          <div className="grid gap-4 grid-cols-4 grid-rows-3 2xl:grid-cols-5">
            {data.map((item, index) => (
              <PostItem key={index} item={item} />
            ))}
          </div>
        ) : (
          <h1 className="text-center text-2xl font-bold mt-6 text-black dark:text-white">
            You have no data! Try to create a new one.
          </h1>
        )}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <h1 className="text-center text-3xl font-bold mt-6 text-black dark:text-white">
        You need to sign in to access this page!
      </h1>
    </div>
  );
};

export default PostsByUserId;
