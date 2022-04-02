import { ADD_COMMENT } from "./types";
import axios from "axios";

export function addComment(dataToSubmit){
    const request = axios
    .post("/api/comments/upload", dataToSubmit)
    .then((res) => res.data);

    return {
        type: ADD_COMMENT,
        payload: request
    }
}