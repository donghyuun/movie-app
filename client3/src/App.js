import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Navigation/Home";
import About from "./components/Navigation/About";
import Detail from "./components/Detail";
import {Routes,Route, BrowserRouter} from "react-router-dom";
import Login from "./components/Navigation/Login";
import Register from "./components/Navigation/Register";
import axios from "axios";
import Auth from "./hoc아직안씀/auth"
import Image from "./components/Navigation/Image";

function App() {
  const [auth, setauth] = useState(false);

  axios.get("/api/users/auth").then((res) => {
    if (res.data.isAuth) {
      setauth(true);
    }
  });
  return (
    <div className="total">
      <div className="top">
        <Navigation auth={auth}/>
        <Routes>   
          <Route path="/"  element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/movie/:id" element={<Detail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Register/>} />
          <Route path="/image" element={<Image />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


