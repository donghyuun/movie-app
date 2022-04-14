import React, { useState } from "react";
import "./Image.css";
import axios from "axios";

const option = [
  { value: 0, label: "All" },
  { value: 1, label: "Work out" },
  { value: 2, label: "Joging" },
  { value: 3, label: "Studying" },
];

function Image() {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const [option, setOption] = useState("All");
  const [filePath, setFilePath] = useState("");

  const onTitleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onAuthorHandler = (e) => {
    e.preventDefault();
    setAuthor(e.target.value);
  };
  const onDescriptionHandler = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const onFileHandler = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(file);
  };
  const onOptionHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setOption(e.target.value);
  };

  const data = new FormData();
  data.append("image", file); //key(fieldName) & value

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const fileBody = data;
    const infoBody = {
      title: title,
      description: description,
      //file: data,
      option: option,
    };
    
    console.log(fileBody, infoBody);
    axios.post("/api/image", fileBody)
    .then(res => {
        if(res.data.success){
            console.log(res.data)
            setFilePath(res.data.url);
            axios.post("api/image/info", infoBody)
        }
    })

  };
  return (
    <div className="container">
      <h1>New blog post</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            onChange={onTitleHandler}
            placeholder="Title"
            name="title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            onChange={onDescriptionHandler}
            placeholder="Description"
            name="description"
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={onFileHandler}
            id="image"
            multiple
          />
        </div>
        <select onChange={onOptionHandler} name="option">
          <option key={0} value="Etc">
            Etc
          </option>
          <option key={1} value="Work out">
            Work out
          </option>
          <option key={2} value="Joging">
            Joging
          </option>
          <option key={3} value="Studying">
            Studying
          </option>
        </select>
        <div>
          <a href="/">Cancel</a>
          <button type="submit">Save</button>
        </div>
      </form>

      {filePath && 
        <img src={`http://localhost:5000/${filePath}`} alt="image" />
      }
    </div>
  );
}

export default Image;
