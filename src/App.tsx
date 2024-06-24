import React, { useEffect } from 'react';
import { Layout, theme, Typography, ConfigProvider, FloatButton } from 'antd';
import RouteView from './router';
import Header from './pages/header';
import type { RootState } from './store';
import { useSelector } from 'react-redux';
import './App.css';

const { Text } = Typography;

function App() {
  const isSun = useSelector((state: RootState) => state.lightDark.value);

  useEffect(() => {
    if (isSun) {
      document.documentElement.style.setProperty('--body-bg-color', '#f5f5f5');
    } else {
      document.documentElement.style.setProperty('--body-bg-color', '#141414');
    }
  }, [isSun]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        algorithm: isSun ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout style={{background: 'transparent'}}>
        <header>
          <Header />
        </header>
        <main>
          <RouteView />
        </main>
        <footer>
          <Text>@leaf</Text>
        </footer>
        <FloatButton.BackTop />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
