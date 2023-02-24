import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18nextInit';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="...">
      
      <App />
      <ToastContainer />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
