import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
const addFood=async (req,res)=>{
    let image_filename = req.file.filename;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    await food.save();
    res.json({ success: true });
}

//all food display
const listFood =async (req,res)=>{
    const foods = await foodModel.find({});
    res.json({ data: foods,success: true });
}

//remove food item
const removeFood=async(req,res)=>{
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true });
}


export {addFood,listFood,removeFood}