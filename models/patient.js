const mongoose=require("mongoose");

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
        min:1000000000,
        max:9999999999
    },
},{
    timestamps:true
});

const Patient=mongoose.model("Patient",patientSchema);
module.exports=Patient;