const userRoutes=require("express").Router();
const { hashPassword, hashValidator } = require("../hash/hashing");
const User=require("../models/userSchema");
userRoutes.get("/",(req,res)=>{
    res.send("userRoutes working")
})
userRoutes.post("/signup",async(req,res)=>{
        try {
            const existingUser=await User.findOne({email:req.body.email});
            // console.log(existingUser);
            if(existingUser!=null || existingUser){
                res.status(400).json({
                    status:"Failed",
                    message:"Already registered user"
                })
            }
            else{
                const generatedPassword=await hashPassword(req.body.password);
                const newUser=await User.create({
                    email:req.body.email,
                    password:generatedPassword
                });
                res.status(200).json({
                    status:"Success",
                    message:"User created Successfully",
                    user:newUser
                })
            }
        } catch (error) {
            res.send(error)
        }
 
})
userRoutes.post("/login",async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email});
        if(existingUser || existingUser != null){
             const checkPassword=await hashValidator(req.body.password,existingUser.password);
             if(checkPassword){
                res.status(200).json({
                    status:"Success",
                    message:"Login Successfully",
                    details:{
                        email:req.body.email,
                        userId:existingUser._id
                    }
                })
             }
             else{
                res.status(400).json({
                    status:"Failed",
                    message:"Invalid email or password"
                })
             }
        }

    } catch (error) {
        res.send(error)
    }
})
module.exports=userRoutes;