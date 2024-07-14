import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Bookstable from "../Components/Bookstable";
import BooksCard from "../Components/BooksCard";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setloading] = useState(false);
  const [showType, setshowType] = useState("table");

  const myApi= import.meta.env.VITE_BACKEND_SERVICE_URL;
  useEffect(() => {
    setloading(true);
    axios
      .get(`${myApi}/book`)    //http://localhost:4000/book
      .then((res) => {
        setBooks(res.data.data);
        console.log("Response from server:", res.data);
        setloading(false);
      })
      .catch((error) => {
        console.log("Error");
        setloading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-600 hover:bg-slate-300 px-4 py-1 rounded-lg"
            onClick={() => {
              setshowType("table");
            }}
          >
            Table
          </button>
          <button
            className="bg-sky-600 hover:bg-slate-300 px-4 py-1 rounded-lg"
            onClick={() => {
              setshowType("card");
            }}
          >
            Card
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/book/create">
          <MdOutlineAddBox className="text-sky-700 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> :showType=='table'?( <Bookstable books={books}/>): (<BooksCard books={books}/>)}
    </div>
  );
};

export default Home;
