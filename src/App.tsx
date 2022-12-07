import React from 'react';
import { Layout, theme, Button, Typography } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import { router } from './router';
import Home from './pages/home';
import Nav from './pages/nav';
import './App.css';

const { Text } = Typography;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <header style={{background: colorBgContainer}}>
        <Link to="/"><Button>Home</Button></Link>
        <Link to="/home"><Button>hom1</Button></Link>
        <Link to="/nav"><Button>nav</Button></Link>
      </header>
      <main style={{background: colorBgContainer}}>
        <Routes>
          <Route path="/nav" element={<Nav />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </main>
      <footer style={{background: colorBgContainer}}>
        <Text>@leaf</Text>
      </footer>
    </Layout>
  );
}

export default App;
