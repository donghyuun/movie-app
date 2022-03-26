import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navigation({auth}){
    const navigate = useNavigate();

    const onLogoutHandler = async (e) => {
        e.preventDefault();    
        
        axios.get('/api/users/logout').then(res => {
            if(res.data.success){
                alert("로그아웃 되었습니다")
                window.location.reload();}
            else(alert("로그인 상태가 아닙니다"))
        })
    }
    if(auth){
        return (
          <div>
            <div className="navigation">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <a href="/api/users/logout" onClick={onLogoutHandler}>Logout</a>
            </div> 
          </div>
        );
      }
      return(
        <div>
          <div className="navigation">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
            </div> 
        </div>
      )
}

export default Navigation;
/*
    return(
        <div>
            <div className="navigation">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
                <a href="/api/users/logout" onClick={onLogoutHandler}>Logout</a>
            </div> 
        </div>
    )
*/