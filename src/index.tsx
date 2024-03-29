import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {
//   BrowserRouter as Router,   //<<----- BrowserRouter pakeistas i HashRouter
// } from "react-router-dom"

import { HashRouter as Router, Route, Link, Routes } from "react-router-dom"; //<<----- BrowserRouter pakeistas i HashRouter
//redux
import { Provider } from 'react-redux'
import store from './store'



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
