const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema({
      userId:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
      title:String,
      author:String,
      image:{
        url:{type:String},
        publicId:{type:String},
        type:{type:String},
      },
      ingredients:Array,
      directions:String
})

module.exports=mongoose.model("recipes",recipeSchema);