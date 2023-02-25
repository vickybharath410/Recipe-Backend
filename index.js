const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
mongoose.set('strictQuery', true)
mongoose.connect(process.env.URL,()=>console.log("Database Connected"))
const userRoutes=require("./routes/user");
const recipeRoutes = require("./routes/recipe");
const cors=require("cors")

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use("/user",userRoutes)
app.use("/recipe",recipeRoutes)
app.get("/*",(req,res)=>{
    res.send("routes not found")
})
app.get("/",(req,res)=>{
    res.send("Working")
})
app.listen(5000,()=>console.log("Backend connected"))