import React from "react";
import { useLocation } from "react-router-dom";
import './Detail.css';
import CommentList from "./comment/CommentList";
import axios from "axios";

function Detail(){
    const location = useLocation();
    const state = location.state;
    const authData = axios.get("/api/users/auth")
    return(
        <div className="detail">
            <div className="movieInfo">
                <h1>{state.title}</h1>
                <h2>{state.year}</h2>
                <h3>{state.genres}</h3>
                <img alt="" src={state.poster}/>
                <p>{state.summary}</p>
            </div>
            <CommentList className="comment"  movieId={state.id} ></CommentList>
        </div>
    )
}

export default Detail;