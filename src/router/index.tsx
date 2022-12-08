import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Nav from '../pages/nav';
import Blog from '../pages/blog';

const RouteView = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/blog" element={<Blog />}></Route>
      <Route path="/nav" element={<Nav />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
};

export default RouteView;