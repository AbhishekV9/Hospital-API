const mongoose=require("mongoose");

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    repots:[
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