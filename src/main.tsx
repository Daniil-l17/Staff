import ReactDOM from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { MainLayout } from './layout/MainLayout.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router/Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
    <MainLayout>
        <Router/>
    </MainLayout>
      </BrowserRouter>
  </MantineProvider>,
);
