import React from "react";
import { useLocation } from "react-router-dom";
import './Detail.css';

function Detail(){
    const location = useLocation();
    const state = location.state;
    return(
        <div className="detail">
            <h1>{state.title}</h1>
            <h2>{state.year}</h2>
            <h3>{state.genres}</h3>
            <img alt="" src={state.poster}/>
            <p>{state.summary}</p>
        </div>
    )
}

export default Detail;