import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import {Provider} from "react-redux";
import configureStore from './redux/configureStore';

axios.defaults.baseURL = 'http://localhost:8000/api/influencer/';
axios.defaults.withCredentials  = true;
//axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
