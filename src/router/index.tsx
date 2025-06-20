import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Nav from '../pages/nav';
import Blog from '../pages/blog';
import BlogList from '../pages/blog/list';
import BlogDetail from '../pages/blog/detail';
import Demos from '../pages/demos';
import RealHome from '../pages/realHome';
import Chat from '../pages/chat';

const RouteView = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/blog" element={<Blog />}>
        <Route path=":title" element={<BlogDetail/>}></Route>
        <Route path="list" element={<BlogList />}></Route>
      </Route>
      <Route path="/nav" element={<Nav />}></Route>
      <Route path="/demos" element={<Demos />}></Route>
      <Route path="/realHome" element={<RealHome />}></Route>
      {/* <Route path="/chat" element={<Chat />}></Route> */}
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
};

export default RouteView;