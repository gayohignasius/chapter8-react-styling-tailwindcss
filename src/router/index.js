import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateNewPost from "../pages/CreateNewPost";
import EditPost from "../pages/EditPost";
import Login from "../pages/Login";
import PostDetail from "../pages/PostDetail";
import Posts from "../pages/Posts";
import PostsByUserId from "../pages/PostsByUserId";
import Registration from "../pages/Register";

const Routing = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  return (
    <>
      <div
        className={`min-h-screen w-full flex flex-col transition duration-200 ${
          darkToggle && "dark"
        }`}
      >
        <Navbar toggleTheme={() => setDarkToggle(!darkToggle)} />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route exact path="/" element={<Posts />} />
          <Route path="posts" element={<PostsByUserId />} />
          <Route path="posts/new-post" element={<CreateNewPost />} />
          <Route path="posts/:postId" element={<PostDetail />}>
            <Route path="edit-post" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Routing;
