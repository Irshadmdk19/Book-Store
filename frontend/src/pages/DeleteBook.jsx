import React, { useState } from 'react'
import Spinner from '../Components/Spinner'
import BackButton from '../Components/BackButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const DeleteBook = () => {
  const [loading, setloading] = useState(false)
  const navigate=useNavigate();
  const {id}=useParams();
  
  const myApi= import.meta.env.VITE_BACKEND_SERVICE_URL;
  const handleDeleteBook=()=>{
    setloading(true);
    axios
    .delete(`${myApi}/book/${id}`)
    .then(()=>{
      setloading(false);
      navigate('/');

    })
    
  }
  return (
    
    <div className='p-4'>
      <BackButton/>
      <h1 classNameh3='text-3xl my-4'>Delete book</h1>
      {loading ?<Spinner/>:''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[450px] p-8 mx-auto'>
        <h3 className='text-2xl'> Are you surely want to delete it?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
          Yes
        </button>

      </div>

    </div>
  )
}

export default DeleteBook