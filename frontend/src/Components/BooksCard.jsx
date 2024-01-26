import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi';
import {PiBookOpenTextLight} from 'react-icons/pi'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({books}) => {

  return (
    <div className='flex gap-2'>
        {books.map((item)=>(
            <BookSingleCard key={item._id} book={item}/>
            ))}

    </div>
  )
}

export default BooksCard