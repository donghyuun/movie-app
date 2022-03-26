import React, {useEffect} from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

//해당 컴포넌트에 들어가기 전에 권한(auth) 검사하고, 통과되면 컴포넌트 반환

function auth(Component, Option){
    function Authentication(){
        axios.get("/api/users/auth").then((value)=>{
            if(value.data.error){
                console.log("유저 정보 없음", value.data.err);
            }else{
                console.log(value.data.user);
            }
        });
        return <Component></Component>
    }
    return Authentication;
}

export default auth;