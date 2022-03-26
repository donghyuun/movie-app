import React, {useEffect, useState} from "react";
import axios from "axios";
import Movie from "../Movie";

function Home(){
    const [movies, setMovies] = useState();
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(undefined||"");

    const getMovies = async () => {
    const {data: {data : {movies}}} = 
    await axios.get("https://yts.mx/api/v2/list_movies.json");
    setMovies({movies});
      //setLoading({loading: true})
    }

    const getSearchMovies = async (e) => {
    e.preventDefault();
    const {data: {data: {movies}}} = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term="${text}"`);
    if(movies == undefined){alert("검색 결과가 존재하지 않습니다")}else{setMovies({movies})}
    }

    const addText = (e) => {setText(e.target.value)}

    useEffect(()=> {
        getMovies();
        //axios.get('/api/hello').then(res =>{console.log(res)});
    },[])//렌더링 완료된 후 실행
    return(
    <div>
        <div className="search">
            <form className="form" onSubmit ={getSearchMovies}>
                <input className="input" type="text" value={text||""} onChange={addText}/>
                <input type="submit" value="submit"/>
        </form>
        </div>
        <div className="movies">
            {movies && movies.movies.map(movie => 
            <Movie
            key={movie.id}
            id={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}/>
            )}
        </div>  
    </div>
    )
}

export default Home;