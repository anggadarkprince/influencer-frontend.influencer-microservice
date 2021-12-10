import React from 'react';
import './App.css';
import Main from "./pages/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./public/Login";
import Register from "./public/Register";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/register'} element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
