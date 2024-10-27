import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



const createToken=(id)=>{
    const secret = process.env.JWT_SECRET;
    return jwt.sign({id},secret)
}

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
    if(!user)   return res.json({success:false,message:"User Not Found"})  
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch)    return res.json({success:false,message:"Something Went Wrong"})
    const token=createToken(user._id)
    res.json({success:true,token})
}

const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    const exist=await userModel.findOne({email})
    if(exist)  return res.json({success:false,message:"User already exists"})
    if(!validator.isEmail(email))   return res.json({success:false,message:"Invalid Email"})
    if(password.length<8)   return res.json({success:false,message:"Enter Strong Password"})
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user=await newUser.save()
    const token=createToken(user._id)
    res.json({success:true,token})
}

export {loginUser,registerUser}