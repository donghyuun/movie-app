/* eslint-disable import/no-anonymous-default-export */
import { ADD_COMMENT } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return { ...state, addSuccess: action.payload }
    default:
      return state;
  }
}
//action함수가 서버로부터 받아온 데이터를 받아서 state에 적용한다