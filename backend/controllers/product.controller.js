import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json({data: products})
  }catch(err){
    console.log(err)
    res.status(500).json({success:false, message:"Product fetch failed!"})
  }
}

export const createProducts = async(req, res) => {
  const product = req.body; //value sent from postman

  if(!product.name || !product.price || !product.image){
    return res.status(400).json({Success: false, message:"Please provide all fields!"})
  }
  const newProduct = new Product(product)

  try{
    await newProduct.save()
    res.status(201).json({success:true, data:newProduct})
  }catch(error){
    console.error("Error in Create Product", error.message)
    res.status(500).json({success:false, message:"Server Error"})
  }
}

export const updateProduct =  async(req,res)=>{
  const {id}= req.params;
  const product = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, messgae:"Product not found!"})
  }
  try{
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
    res.status(200).json({success: true, data:updatedProduct})
  }catch(err){
    console.log(err)
    res.status(500).json({success:false, message:"Product Update failed!"})
  }
}

export const deleteProduct = async(req,res) =>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, messgae:"Product not found!"})
  }
  try{
    await Product.findByIdAndDelete(id)
    res.status(200).json({success:true, message:"Product deleted succesfully!"})
    //console.log("Item deleted succesfully!")
  }catch(err){
    console.log(err)
    res.status(500).json({success: false, message: "Server Error!"})
  }
}