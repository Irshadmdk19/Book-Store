import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";


const EditBook = () => {
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yearOfPublish, setyearOfPublish] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();

  useEffect(() => {
    setloading(true);
    axios.get(`http://localhost:4000/book/${id}`)
    .then((res) => {
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setyearOfPublish(res.data.yearOfPublish);
      setloading(false);
      })
      .catch((error)=>{
        setloading(false)
        alert('An error occured please check console');
        console.log(error);
      })
  }, [])
  

  const handleEditBook = () => {
    const data = {
      title,
      author,
      yearOfPublish,
    };
    setloading(true);
    axios
      .put(`http://localhost:4000/book/${id}`, data)
      .then(() => {
        setloading(false);
        navigate("/");
      })
      .catch((error) => {
        setloading(false);
        alert("An error happend Please check console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"> Edit Book</h1>
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
        <button onClick={handleEditBook} className="bg-sky-800 hover:bg">
          Save
        </button>


      </div>
    </div>
  );
};

export default EditBook;
