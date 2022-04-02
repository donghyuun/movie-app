import React, { useState } from "react";
import "./Register.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const onIdHandler = (e) => {
        setId(e.target.value);
    }
    const onPassWordHandler = (e) => {
        setPassword(e.target.value);
    }
    const onEmailHandler = (e) => {
        setEmail(e.target.value);
    }
    const onConfirmPWHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            alert("비밀번호가 다릅니다.");
            return "비밀번호 다름";
        }else{
            console.log("okay")
        }
        let body = {
            email: email,
            password: password,
        }
        dispatch(registerUser(body)).then((res)=>{
            if(res.payload.success){
                navigate('/login')
                //회원가입 완료 후 다시 로그인 페이지로
            }else{ 
                alert("비밀번호는 최소 5자 이상입니다.")
            }
        })
    }

    return(
        <div>
            <form className="registerForm" onSubmit={onSubmitHandler}>
                <h1>REGISTER</h1>
                <label>Email</label>
                <input type="text" value={email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="text" value={password} onChange={onPassWordHandler}/>
                <label>Confirm Password</label>
                <input tpye="password" value={confirmpassword} onChange={onConfirmPWHandler}/>
                <br/>
                <button type = "submit">Register</button>
            </form>
        </div>
    )
}

export default Register;