// Importing modules
import express from "express";
import jwt from 'jsonwebtoken';
import { UserModel } from "../model/Users.js";


const router = express.Router();

// Registeration of user details.
router.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({message:"Already Exits"});
    }
    //  const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserModel({username,password});
    await newUser.save();
    res.json({message:"user registration Success"});
});

// Login function for user.
router.post("/login",async (req,res)=>{
    const {username,password} =req.body;
    const user = await UserModel.findOne({username});
    // console.log(user);
    if(!user){
        return res.json({message:"User Doesnt Exist"});
    } 
    const isPasswordValid= password===user.password;
    if(!isPasswordValid){
        return res.json({message:"Username Or Password Invalid"});
    }
    const token = jwt.sign({id:user._id},"secret");
    res.json({token,userID:user._id}); 
});

export { router as userRouter};