import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const [cookies, removeCookie] = useCookies(["accessToken", "userId"]);

  const handleLogout = () => {
    removeCookie("accessToken");
    removeCookie("userId");
  };

  useEffect(() => {
    removeCookie("accessToken");
    removeCookie("userId");
  }, [removeCookie]);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-900 p-6">
        <div className="flex items-center text-gray-800 dark:text-gray-200 mr-6 text-lg font-bold">
          Logo
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-800 dark:border-gray-200">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto divide-y-2 sm:divide-y-0">
          <div className="text-md lg:flex-grow">
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
              to="/"
            >
              Home
            </Link>

            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
              to="/posts"
            >
              Posts
            </Link>
            <Link
              className="block mt-4 mb-4 sm:mb-0 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
              to="/posts/new-post"
            >
              Create Post
            </Link>
          </div>
          <div className="text-md lg:flex items-center">
            {cookies.accessToken !== "undefined" &&
            cookies.userId !== "undefined" ? (
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
                to="/"
                onClick={handleLogout}
              >
                Sign Out
              </Link>
            ) : (
              <>
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 dark:text-gray-200 hover:text-gray-800 mr-4"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="block mt-4 lg:inline-block lg:mt-0">
              <label className="toggleDarkBtn">
                <input type="checkbox" onClick={props.toggleTheme} />
                <span className="slideBtnTg round"></span>
              </label>
            </div>
          </div>
        </div>
      </nav>

      {/* <div className="min-h-screen bg-gray-300 dark:bg-gray-800">
        <Outlet />
      </div> */}
    </>
  );
};

export default Navbar;
