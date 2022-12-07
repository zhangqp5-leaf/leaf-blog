import React from 'react';
import { Layout, theme } from 'antd';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout'>
      <Header style={{background: colorBgContainer}}>Header</Header>
      <Content style={{height: '200px', background: colorBgContainer}}>Content</Content>
      <Footer style={{textAlign: 'center'}}>
        @leaf
      </Footer>
    </Layout>
  );
}

export default App;
