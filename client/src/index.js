import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import ptBR from 'antd/lib/locale/pt_BR';
import { ConfigProvider } from 'antd';

import './index.css';
import 'antd/dist/antd.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
