const recipeRoutes=require("express").Router();
const Recipe=require("../models/recipeSchema");
recipeRoutes.get("/",(req,res)=>{
    res.send("working")
})
recipeRoutes.post("/add",async(req,res)=>{
    try {
        const newRecipe=await Recipe.create(req.body);
        res.send(newRecipe)
    } catch (error) {
        res.send(error);
    }
})
recipeRoutes.delete("/delete/:id",async(req,res)=>{
try {
    const deletedRecipe=await Recipe.findByIdAndDelete({_id:req.params.id});
    res.status(200).json({
        status:"Sucess",
        message:"Recipe deleted",
    })
} catch (error) {
    res.status(400).json({
        status:"failed",
        message:"unable process your request"
    })
}
})
recipeRoutes.get("/all",async(req,res)=>{
    try {
        const allItem=await Recipe.find();
        res.status(200).json({
            status:"Success",
            message:"Items Available",
            details:allItem
        })
    } catch (error) {
        res.send(error)
    }
})

module.exports =recipeRoutes;