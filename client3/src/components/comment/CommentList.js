import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./Comment.css";

function CommentList({ movieId }) {
  //console.log("movieId값은 ", movieId, "입니다.");  const [comment, setComment] = useState("");
  const [commentList, setcommentList] = useState([]);

  //db에 저장되어 있는 movieId에 해당하는 댓글들을 불러와서 commentList에 저장
  

  useEffect(() => {
    const request = axios.post("/api/comments/get", { movieId }).then(res => res.data.commentList);
    
    (async()=>{ let result = await request; 
    setcommentList(result)})()
  }, []);
  
  
  
  //댓글 전체 부분(댓글 등록 + 댓글 모음)
  return (
    <div className="comment">
      <div className="divider"></div>
      
      <CommentForm /*댓글 입력창*/movieId={movieId}></CommentForm>
      <section className="comment-list">
        {commentList.map((value,index) => {//value = 댓글 객체
          console.log(value)
          return <Comment key={index} comment={value.comment} name={value.name} movieId={movieId}/>;
        })}
      </section>
    </div>
  );
}

export default CommentList;