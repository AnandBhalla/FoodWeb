import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';

// const stripeKey = process.env.STRIPE_SECRET_KEY;
// const stripe = new Stripe(stripeKey);

const placeOrder = async (req, res) => {
    const frontend = process.env.FRONTEND;
    const deliveryCharge = 15;
    let totalAmount = deliveryCharge;

    for (let i = 0; i < req.body.items.length; i++) {
        const item = req.body.items[i];
        totalAmount += item.price * item.quantity;
    }

    const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: totalAmount,
        address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({
        success: true,
        message: "Order placed successfully.",
        totalAmount: totalAmount,
        orderId: newOrder._id,
    });
};

const userOrders = async (req, res) => {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        res.json({ success: true, message: "paid" });
    } else {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "not paid" });
    }
};

const listOrders = async (req, res) => {
    const order = await orderModel.find({});
    res.json({ success:true, data: order });
};

const updateStatus = async (req,res)=>{
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status updated"})
}

export { placeOrder, verifyOrder, userOrders, listOrders,updateStatus};
