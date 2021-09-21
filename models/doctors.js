
const mongoose=require("mongoose");

const doctorSchema= new mongoose.Schema({
    //name of the doctor
    name:{
        type:String,
        required:true
    },
    //email of the doctor
    email:{
        type:String,
        unique:true,
        required:true
    },
    //passqord of the doctor
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Doctor=mongoose.model("Doctor",doctorSchema);
module.exports=Doctor;