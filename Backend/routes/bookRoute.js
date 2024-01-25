import express from 'express';
import mongoose from 'mongoose';
import {Book} from "../models/bookModel.js"
const router= express.Router();

// Adding books
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.yearOfPublish) {
        return res.status(400).send({ message: "Send all required fields" });
      }
  
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        yearOfPublish: req.body.yearOfPublish,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
// Displaying all books
  router.get("/", async (req, res) => {
    try {
      const book = await Book.find();
      return res.status(200).json({
        count: book.length,
        data: book,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });

//  Displaying book by id 
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });

//Updating Book by id   
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.yearOfPublish) {
        return res.status(400).send({ message: "Send all required fields" });
      }
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
      if(!result){
          return res.status(404).send({ message: "The book was not found"});
          
      }
      else{
          return res.status(200).send({message:"Book Updated Successfully"})
      }
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
    }
  });
  
  //delete book by id
  router.delete('/:id',async(req,res)=>{
      try{
          const {id}=req.params;
          const result= await Book.findByIdAndDelete(id);
          if(!result){
              return res.status(404).send({message:'Book not found'});
          }
          return res.status(200).send({message: "Book Deleted Successfully"})
      }
      catch(error){
          console.log(error.message);
          return res.status(500).send({message:error.message})
      }
  })

export default router
  