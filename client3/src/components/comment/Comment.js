import React, { useState, useEffect } from "react";
import axios from "axios";

import Moment from 'react-moment';

const Comment = ( {name, comment, movieId} )=> {
  //comment = 댓글 객체
  const [editedComment, seteditedComment] = useState("")
  const [isitEdit, setisitEdit] = useState(false)


  return(
    <div>닉네임: {name}, 내용: {comment}</div>
  )
  //댓글 수정 => 댓글 창에 댓글의 내용이 보여짐(수정할 수 있게)
  //실행할 때마다 true, false 번갈아짐

/*
  function editComment() {
    if(isitEdit){
      setisitEdit(false)
    }else{
      seteditedComment(comment.content)
      setisitEdit(true)
    }
  }

  const editedCommentHandler = (e) => {
    seteditedComment(e.currentTarget.value);
    console.log(editedComment)
  };

  function deleteComment(event) {
    const commentID = comment.id;//해당 댓글의 id로 db서 지움
    event.preventDefault();
    axios.post('/api/comments/delete', {commentID})
    .then(value =>{
      if(value.status !== 203){
        alert("삭제되었습니다")
        window.location.reload();
      }
    })
  }

  //댓글 수정한 것 등록하기
  function postEditComment(e){
    e.preventDefault();
    const edit = {
      content : editedComment,
      id: comment.id,
    }
    axios.post("/api/comments/edit", edit)
    //edit안에 수정된 내용과 댓글 id 담겨있음
    .then(value=>{
      console.log(value)
      if(!value.data.success){
        if(value.data.err === "notLogined"){
          return alert('로그인 상태가 아닙니다.')
        }
        return alert('댓글 수정 실패')
      }
      alert('댓글 수정하였습니다.')
      window.location.reload();
    })
  }


  let content;
  if (!isitEdit) {//편집상태 X
    content =    
    <div className="comment-element">
      <div className="comment-content">
          <div> 😄{comment.userId} | </div>
          <div>{comment.content}</div>
      </div>
      <div className="eidit-box">
          <Moment className="comment-date" parse="YYYY-MM-DD HH:mm">
                  {comment.date}
          </Moment>
          <button className="comment-edit-btn" onClick={editComment}>::</button>
      </div>
    </div>

  } else {//편집상태 O
    content = 
    <section className="comment-edit-container">
      <form >
        <input 
          className="comment-edited-input" 
          name="editedComment" 
          value={editedComment} 
          onChange={editedCommentHandler}
          type="text"
        ></input>

        <div className="comment-edit-btns">
          <button onClick={postEditComment}>수정하기</button>
          <button onClick={editComment}>수정취소</button>
          <button onClick={deleteComment}>삭제하기</button>
        </div>
        
      </form>
    </section>
  }

  return(
    <div>{content}</div>
  )
  */
};

export default Comment;