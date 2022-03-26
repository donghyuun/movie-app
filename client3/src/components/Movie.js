import React from "react";
import './Movie.css';
import { Link } from "react-router-dom";

function Movie({title,year,id,poster,summary,genres}){
    return(
        <div className="movie">
            <div className="movie_data">
                <h1>{title}</h1>
                <h2>{year}</h2>
                <h3>{genres}</h3>
                <img alt="" src={poster}/>
                <p>{summary.slice(0,250)}...</p>
                <Link to={{ pathname:`/movie/${id}`}}
                state={{
                    title,
                    year,
                    id,
                    poster,
                    summary,
                    genres
                }}
            >more details...</Link>
            </div>  
        </div>
        
    )
}

export default Movie;