import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";

const Posts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    axios
      .get("http://localhost:8000/api/v1/posts?size=10")
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
      <h1 className="text-center text-3xl font-bold mt-6 text-black dark:text-white">
        Article List
      </h1>
      <div className="grid content-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 2xl:grid-cols-5">
        {data.map((item, index) => (
          <PostItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
