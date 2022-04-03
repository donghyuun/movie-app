import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import axios from "axios";
import { addComment } from "../../_actions/comment_action";

function CommentForm(props) {//해당 movieId를 props로 받아옴
    const dispatch = useDispatch();
    const [comment, setComment] = useState([])

    const onCommentHandler = (e) => {
        setComment(e.target.value);
      };
    
    const onSubmit = (event) => {
        event.preventDefault();
        let body = {
        comment: comment,
        movieId: props.movieId
        };
        dispatch(addComment(body)).then((res) => {
            if(!res.payload.addSuccess){
                alert("댓글 입력 실패")
            }
        })
    };
    
    //댓글 등록
    return (
        <div>
        <section className="comment-form">
            <form onSubmit={onSubmit}>
                <input
                    value={comment}
                    onChange={onCommentHandler}
                    type="text"
                    required
                ></input>
                <button type="submit" onSubmit={onSubmit}>upload</button>
            </form>
        </section>
        </div>
    )
}

export default CommentForm
/*
 axios.post("/api/comments/upload", values).then((value) => {
            if (value.data.success) {
            setComment("");
            window.location.reload();
            } 
            else {
            if(value.data.err === 'notLogined'){
                return alert("로그인 상태가 아닙니다.");
            }
            alert("댓글 저장에 실패하였습니다.");
            }
        });
*/