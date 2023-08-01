import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, BlogView } from "../../pages";
const RouterNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog-view/:id" element={<BlogView />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RouterNavigation;
