import userModel from "../models/userModel.js";

const addToCart = async (req,res)=>{
    let userData = await userModel.findById(req.body.userId);    
    let cartData=await userData.cartData;
    if(!cartData[req.body.itemId])  cartData[req.body.itemId]=1;
    else    cartData[req.body.itemId]+=1;
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To Cart"})
}

const removeFromCart=async (req,res)=>{
    let userData=await userModel.findById(req.body.userId)
    let cartData=await userData.cartData;
    if(cartData[req.body.itemId]>0)    cartData[req.body.itemId]-=1;
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Succesfully Removed"})
}

const getCart=async(req,res)=>{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    res.json({success:true,cartData})
}

export {addToCart,removeFromCart,getCart}