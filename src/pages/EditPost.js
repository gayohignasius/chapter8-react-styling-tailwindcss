import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  const modalOpen = location.state?.modalOpen;
  const dataArticle = location.state?.post;
  const [values, setValues] = useState({
    title: dataArticle.title,
    image: dataArticle.image,
    description: dataArticle.description,
  });
  const [cookies] = useCookies(["accessToken", "userId"]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(location);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/v1/posts/${dataArticle.id}`, values, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      })
      .then((res) => {
        alert("Edit succesfully!");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        alert("Internal Server Error!");
      });
  };

  const navigate = useNavigate();
  return (
    <>
      {modalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form onSubmit={handleSubmit}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  dark:bg-gray-800">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl text-gray-800 dark:text-gray-200 font-semibold">
                      Edit Post
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="title"
                      type="text"
                      placeholder="Title"
                      defaultValue={dataArticle.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative p-6 flex-auto">
                    <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                      Image
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="image"
                      type="text"
                      placeholder="Image URL"
                      defaultValue={dataArticle.image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative p-6 flex-auto">
                    <label className="block text-gray-800 dark:text-gray-200 text-sm font-bold mb-2">
                      Body
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="4"
                      name="description"
                      type="text"
                      placeholder="Body"
                      defaultValue={dataArticle.description}
                      onChange={handleChange}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 active:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditPost;
