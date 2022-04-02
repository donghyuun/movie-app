import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import "./Comment.css";

function Comment({ key, movieId }) {
  //console.log("movieId값은 ", movieId, "입니다.");  const [comment, setComment] = useState("");
  const [commentList, setcommentList] = useState([]);

  //db에 저장되어 있는 movieId에 해당하는 댓글들을 불러와서 commentList에 저장
  useEffect(() => {
    axios.post("/api/comments/get", { movieId }).then((result) => {
      if (result.data.comments) {
        setcommentList(result.data.comments);
      }
    });

  }, []);

  
  //댓글 전체 부분(댓글 등록 + 댓글 모음)
  return (
    <div className="comment">
      <div className="divider"></div>
      
      <CommentForm /*댓글 입력창*/movieId={movieId}></CommentForm>

      <section className="comment-list">
        {commentList.map((value,index) => {//value = 댓글 객체
          return <CommentList key={index} comment={value} movieId={movieId}/>;
        })}
      </section>

    </div>
  );
}

export default Comment;