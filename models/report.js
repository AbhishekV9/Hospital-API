const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    DoctorName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    PatientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    Status:{
        type:String,
        enum:['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine',
            'Positive-Admit'],
        required:true
    },
    Date:{
        type:Date,
        default:new Date()
    }
})

const Report=mongoose.model("Report",reportSchema);
module.exports=Report;