
const mongoose=require("mongoose");

const doctorSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor;