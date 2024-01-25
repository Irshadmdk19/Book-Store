import express, { response } from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors';

const app = express();

app.use(express.json()); //Middleware for parsing request body
// Middleware for handling CORS policy 
// 1.Allow all origin with default of cors(*)
app.use(cors()); 

// 2. Allow Custom origins 
// app.use(cors({
//     origin: "http://localhost:3000",
//     methos:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use('/book',bookRoute)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to Database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
