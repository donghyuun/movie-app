import axios from "axios";
import { LOGIN_USER, REGISTER_USER, EDIT_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
/*로그인 버튼 누르면 실행되는 action함수, 로그인 정보를 서버로 넘겨(post)주고 답을 받아(res)와서 reducer에게 전달(return)*/

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((res) => res.data);
    //request = {success: true or false}

  return {
    type: REGISTER_USER,
    payload: request,
  };
}//회원가입 버튼 누르면 실행되는 action함수, 회원가입 정보를 서버로 넘겨주고 답을 받아와서 reducer에게 전달

export function editUser(dataToSubmit) {
  const request = axios
    .post("/api/users/edit", dataToSubmit)
    .then((res) => res.data);

  return {
    type: EDIT_USER,
    payload: request,
  };
}
//회원정보 수정버튼 누르면 실행되는 action함수
//서버로에게 수정된 회원정보를 넘겨주고 답을 받아와서 reducer에게 전달