import React, { useState } from "react";
import "./Register.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../_actions/user_action";

function Register(props){
    const dispatch = useDispatch();

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
            id: id,
            password: password,
            email: email
        }
        console.log(`회원가입 정보: ${body}`);
        
        dispatch(registerUser(body)).then((res)=>{
            if(res.payload.success){
                props.history.push("/login");
                //회원가입 완료 후 다시 로그인 페이지로
            }else{ 
                alert("회원 가입 실패 ㅠㅠ")
            }
        })
    }

    return(
        <div>
            <form className="registerForm" onSubmit={onSubmitHandler}>
                <h1>REGISTER</h1>
                <label>Email</label>
                <input type="text" value={id} onChange={onIdHandler}/>
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