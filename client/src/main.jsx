import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {UsuarioProvider} from "./contex/user-context.jsx";

import {BrowserRouter} from "react-router-dom"

import "./assets/css/style.css";


ReactDOM.render(
  <BrowserRouter>
      <App />   
  </BrowserRouter>,
  document.getElementById('root')
)
