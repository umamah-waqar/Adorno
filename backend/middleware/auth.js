import jwt from "jsonwebtoken";
import userModel from "../models/User.js";

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token =req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWTSECRET);
      req.user = await userModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("error in auth middleware, cannot verify token", error);
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    console.log("no token provided");
    res.status(401).json({ message: "No token" });
  }
};

const admin = (req,res,next)=>{
  if(req.user && req.user.role === "administration"){
    next()
  } else {
    res.status(403).json({message:"Admin only"})
  }
}

export {protect,admin};