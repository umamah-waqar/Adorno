import express from "express";
import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {protect,admin} from "../middleware/auth.js";



const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const {name,email,password,role}=req.body;
    if (role && role !== "administration") {
      return res.status(400).json({ message: "Invalid role. Only 'administration' is allowed." });
    }
    const userExists=await userModel.findOne({email:email});
    if (userExists) return res.status(400).json({message: "User already exists"});
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({name:name,email:email,password:hashedPassword,role:role});
    res.status(201).json({_id:user._id, name:user.name, email:user.email});
  } catch (error) {
    console.log("error in user registration",error);
    res.status(500).json({ message: error.message }); 
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (!user||!(await bcrypt.compare(password,user.password))) return res.status(401).json({ message: "Invalid credentials" });
    console.log(process.env.JWTSECRET);
    const token = jwt.sign({id: user._id}, process.env.JWTSECRET,{ expiresIn: "1d" });
    res.json({ _id:user._id, name:user.name, email:user.email,token});
  } catch (error) {
    console.log("error in user login",error);
    res.status(500).json({message:error.message});
  }
});

userRouter.get("/profile",protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({message:"User not found"});
    res.status(200).json(user);
  } catch (error) {
    console.log("error in user profile",error);
    res.status(500).json({message:error.message});
  }
});

export default userRouter;