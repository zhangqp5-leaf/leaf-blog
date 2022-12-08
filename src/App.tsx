import React from 'react';
import { Layout, theme, Typography, ConfigProvider } from 'antd';
import RouteView from './router';
import Header from './pages/header';
import type { RootState } from './store';
import { useSelector } from 'react-redux'
import './App.css';

const { Text } = Typography;

function App() {
  const isSun = useSelector((state: RootState) => state.lightDark.value)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        algorithm: isSun ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Layout>
        <header>
          <Header />
        </header>
        <main>
          <RouteView />
        </main>
        <footer>
          <Text>@leaf</Text>
        </footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
