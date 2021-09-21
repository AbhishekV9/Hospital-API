const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    //name of the doctor who created this report
    doctorName:{
        type:String,
        required:true
    },
    //name of the patient whose report is this
    patientName:{
        type:String,
        required:true
    },
    //ID of the doctor who created this report
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true 
    },
    //ID of the patient whose report is this
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    //sex of the patient
    sex:{
        type:String,
        required:true
    },
    //status of the patient
    status:{
        type:String,
        enum:['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine',
            'Positive-Admit'],
        required:true
    },
    //date when report is created
    date:{
        type:Date,
        default:new Date().getDate()
    }
})

const Report=mongoose.model("Report",reportSchema);
module.exports=Report;