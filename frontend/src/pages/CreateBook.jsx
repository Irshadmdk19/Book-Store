import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";
import {useSnackbar} from 'notistack'


const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yearOfPublish, setyearOfPublish] = useState("");
  const [loading, setloading] = useState(false);

  const {enqueueSnackbar}= useSnackbar();
  const navigate = useNavigate();
  
  const myApi= import.meta.env.VITE_BACKEND_SERVICE_URL;
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      yearOfPublish,
    };
    setloading(true);
    axios
      .post(`${myApi}/book`, data)
      .then(() => {
        setloading(false);
        enqueueSnackbar('Book Created Successfully', {variant: 'success'})
        navigate("/");
      })
      .catch((error) => {
        setloading(false);
        // alert("An error happend Please check console");
        enqueueSnackbar('Error',{variant:'eror'})
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Create Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col border-2 border-sky-700 rounded-xl w-[290px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={yearOfPublish}
            onChange={(e) => setyearOfPublish(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button onClick={handleSaveBook} className="bg-sky-800 hover:bg">
          Save
        </button>


      </div>
    </div>
  );
};

export default CreateBook;
