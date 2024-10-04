import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from "path";

import productRoutes from "./routes/product.route.js"

dotenv.config(); // Load env variables

const app = express();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json()) // interact with postman using JSON in body in req.body is a middleware function

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*",(req,res) =>{
    res.sendFile(path,resolve(__dirname, "frontend", "dist","index.html"))
  })
} 

//POSTMAN

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:"+PORT);
});
