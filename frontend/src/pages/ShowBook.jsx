import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Components/Spinner'
import BackButton from '../Components/BackButton'
import { useParams } from 'react-router-dom'

const ShowBook = () => {
  const [book, setbook] = useState([])
  const [loading, setloading] = useState(false);
  const {id}=useParams();
  const myApi= import.meta.env.VITE_BACKEND_SERVICE_URL;
  useEffect(() => {
    setloading(true);
    axios.get(`${myApi}/book/${id}`)
    .then((res)=>{
      setbook(res.data);
      setloading(false)
    })
    .catch((error)=>{
      console.log("Error", error);
      setloading(false);
    })
    
  }, [])
  
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading?(
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Year of Publish</span>
            <span>{book.yearOfPublish}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created At</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Updated  At</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}

    </div>
  )
}

export default ShowBook