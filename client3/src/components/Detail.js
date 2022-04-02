import React from "react";
import { useLocation } from "react-router-dom";
import './Detail.css';
import Comment from "./comment/Comment";

function Detail(){
    const location = useLocation();
    const state = location.state;
    return(
        <div className="detail">
            <div className="movieInfo">
                <h1>{state.title}</h1>
                <h2>{state.year}</h2>
                <h3>{state.genres}</h3>
                <img alt="" src={state.poster}/>
                <p>{state.summary}</p>
            </div>
            <Comment className="comment" key={state.id} movieId={state.id} ></Comment>
        </div>
    )
}

export default Detail;