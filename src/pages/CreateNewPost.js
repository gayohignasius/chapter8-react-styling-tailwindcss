import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const CreateNewPost = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken", "userId"]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/v1/posts",
        {
          title: values["title"],
          image: values["image"],
          description: values["body"],
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
        alert("Internal Server Error!");
      });
  };
  if (cookies.accessToken !== "undefined" && cookies.userId !== "undefined") {
    return (
      <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <div className="flex justify-center">
          <div className="w-80 rounded-lg overflow-hidden shadow-2xl m-4 bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4">
                <label className="blocktext-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={handleChange}
                />
              </div>
              <div className="px-6 py-4">
                <label className="blocktext-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                  Image URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="image"
                  type="text"
                  placeholder="Image URL"
                  onChange={handleChange}
                />
              </div>
              <div className="px-6 pt-4 mb-4">
                <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                  Body
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  name="body"
                  type="text"
                  placeholder="Body"
                  onChange={handleChange}
                />
              </div>
              <div className="px-6 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
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

export default CreateNewPost;
