import cookie from "react-cookies";

function cookieFunc(){
    try{
        var a = cookie.load("id");//현재 cookie에 있는 id를 가져와서
        if(a != undefined){//id가 존재하는지 확인(= 로그인 되어있는지)
            return true;
        }
    }catch(err){
        return false;
    }
}

export default cookieFunc;