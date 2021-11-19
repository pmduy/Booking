import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import App from './App';
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper'
import 'bootstrap/dist/js/bootstrap'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import reportWebVitals from './reportWebVitals';
import store from './store'
import {Provider} from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
