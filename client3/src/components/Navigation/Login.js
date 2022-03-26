import React, {useState} from "react";
import './Login.css';
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";

function Login(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
        let body = {
            email,
            password
        }
        
        dispatch(loginUser(body)).then((res) => {
            if(res.payload.loginSuccess){
                navigate('/');
                //성공이면 home으로 돌아감
                window.location.reload();
                //새로고침 버튼처럼 현재 리소스를 다시 불러온다
            }else{
                alert("ERROR");
            }
        })
    }
    
    return(
        <div>
            <form className = "loginForm" onSubmit={onSubmitHandler}>
                <h1>LOGIN</h1>
                <label>EMAIL</label>
                <input type="text" value={email} onChange={onEmailHandler}/>
                <label>PASSWORD</label>
                <input type="text" value={password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;