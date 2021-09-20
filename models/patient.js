const mongoose=require("mongoose");

const patientSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Sex:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    Repots:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Report"
        }
    ]

},{
    timestamps:true
});

const Patient=mongoose.model("patient",patientSchema);
module.exports=Patient;