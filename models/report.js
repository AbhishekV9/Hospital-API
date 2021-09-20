const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    doctorName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    status:{
        type:String,
        enum:['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine',
            'Positive-Admit'],
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
})

const Report=mongoose.model("Report",reportSchema);
module.exports=Report;