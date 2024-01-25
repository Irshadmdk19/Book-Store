import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {Link} from 'react-router-dom';
import {AiOutlineEdit} from "react-icons/ai";
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'

const Home = () => {

const [books, setBooks] = useState([])
const [loading, setloading] = useState(false);
useEffect(() => {
    setloading(true)
    axios.get('http://localhost:4000/book')
    .then((res)=>{
        setBooks(res.data.data)
        console.log('Response from server:', res.data);
        setloading(false);
    })
    .catch((error)=>{
        console.log("Error");
        setloading(false);
    });
}, [])

  return (
    <div className='p-4'>
       <div className='flex justify-between items-center'>
         <h1 className='text-3xl my-8'>Books List</h1>
         <Link to='/book/create'><MdOutlineAddBox className='text-sky-700 text-4xl'/>
         </Link>
        </div> 
        {loading?(
            <Spinner/>
        ):(
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No.</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md'>Publish Year</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>

                    </tr>
                </thead>
                <tbody>
                    {books.map((book,index)=>(
                        <tr key={book._id} className='h8'>
                            <td className="border  border-slate-600 rounded-md text-center">{index+1}</td>
                            <td className='border  border-slate-600 rounded-md text-center'>{book.title}</td>
                            <td className='border  border-slate-600 rounded-md text-center max-md:hidden'>{book.author}</td>
                            <td className='border  border-slate-600 rounded-md text-center max-md:hidden'>{book.yearOfPublish}</td>
                            <td className='border  border-slate-600 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/book/details/${book._id}`} >
                                        <BsInfoCircle className='text-2xl text-green-400'/>
                                    </Link>
                                    <Link to={`/book/edit/${book._id}`} >
                                        <AiOutlineEdit className='text-2xl text-yellow-400'/>
                                    </Link>
                                    <Link to={`/book/delete/${book._id}`} >
                                        <MdOutlineDelete className='text-2xl text-red-400'/>
                                    </Link>

                                </div>
                            </td>
                            

                            
                        </tr>
                    ))}
                </tbody>

            </table>

        )}
    </div>
  )
}

export default Home