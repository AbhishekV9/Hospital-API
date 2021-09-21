const jwt=require('jsonwebtoken');//to decode the JWT token

const Patient=require('../models/patient');//Patient's model
const Doctor=require('../models/doctors');//Doctor's model
const Report=require('../models/report');//Report's model

//function to register new patient
module.exports.registerPatient=async function(req,res){
    try {
        //getiing the header's authorization part
        const doctorJWTToken = req.headers.authorization;
        //splitting it into arrays on space. [0]=bearer [1]="token"
        const token = doctorJWTToken.split(' ');
        //decoding token
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
        //finding doctor with the id from decoded
        const doctor=await Doctor.findById(decoded._id);
        //if doctor does not exist then returning a response
        if(!doctor){
            return res.json('401',{
                message:"Doctor dosen't Exist"
            });
        }
        //if the phoneNumber in body is not correct then returning a response
        if(req.body.phoneNumber<1000000000 || req.body.phoneNumber>9999999999 ){
            return res.json(422,{
                message:"Invalid Phone Number"
            })
        }
        //finding patient on the basis of phone number
        let patient=await Patient.findOne({phoneNumber:req.body.phoneNumber});
        //returning response if patient allready exists
        if(patient){
            return res.json(200,{
                message:'Patient already Exist',
                patient
            });
        }
        //otherwise creating a new patient with all the details that are required
        patient=await Patient.create(req.body);
        //returning response with patient that has been created
        return res.json(200,{
            message:'Patient Sucessfully Created',
            patient
        });
    } catch (error) {
        //catching errors
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}

//function for creating patient's report
module.exports.createReport=async function(req,res){
    try {
        //getiing the header's authorization part
        const doctorJWTToken = req.headers.authorization;
        //splitting it into arrays on space. [0]=bearer [1]="token"
        const token = doctorJWTToken.split(' ');
         //decoding token
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
         //finding doctor with the id from decoded
        const doctor=await Doctor.findById(decoded._id);
        //if doctor does not exist then returning a response
        if(!doctor){
            return res.json('401',{
                message:"Doctor does not Exist"
            });
        }
        //finding patient on the basis of ID
        let patient=await Patient.findById(req.params.id);
        //returning response if patient has not registered till now
        if(!patient){
            return res.json(404,{
                message:'Patient needs to register first as this Patient does not exist',
            });
        }
        //otherwise creating report with all the required information
        let report= await Report.create({
            doctorName:doctor.name,
            patientName:patient.name,
            doctorId:doctor._id,
            patientId:patient._id,
            sex:patient.sex,
            status:req.body.status,
        })
        //returning response with report that has been created
        return res.json(200,{
            message:`${patient.name} Report is ready:-Watch It`,
            report
        })
    } catch (error) {
        //catching errors
        console.log(error)
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}

//function for returning all the reports of the patient
module.exports.allReports=async function(req,res){
    try {
        //getiing the header's authorization part
        const doctorJWTToken = req.headers.authorization;
        //splitting it into arrays on space. [0]=bearer [1]="token"
        const token = doctorJWTToken.split(' ');
         //decoding token
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
         //finding doctor with the id from decoded
        const doctor=await Doctor.findById(decoded._id);
        //if doctor does not exist then returning a response
        if(!doctor){
            return res.json('401',{
                message:"Doctor does not Exist"
            });
        }
        //finding patient on the basis of ID
        let patient=await Patient.findById(req.params.id);
        //returning response if patient has not registered till now
        if(!patient){
            return res.json(404,{
                message:'Patient needs to register first as this Patient does not exist',
            });
        }
        //finding report on the basis of patient Id and sorting it oldest to newest
        const reports=await Report.find({patientId:req.params.id}).sort({date:-1})
        //if no reports are there for patient then returning the response
        if(reports.length===0){
            return res.json('401',{
                message:`No Reports for ${patient.name} is present in Database`
            });
        }
        //otherwise returning the response with all the reports founded
        return res.json(200,{
            message:`List of all ${patient.name} reports are:` ,
            reports
        })
    } catch (error) {
        //catching errors
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}
