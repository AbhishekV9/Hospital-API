const jwt=require('jsonwebtoken');

const Patient=require('../models/patient');
const Doctor=require('../models/doctors');
const Report=require('../models/report');

module.exports.registerPatient=async function(req,res){
    try {
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
        const doctor=await Doctor.findById(decoded._id);
        if(!doctor){
            return res.json('401',{
                message:"Doctor dosen't Exist"
            });
        }
        let patient=await Patient.findOne({phoneNumber:req.body.phoneNumber});
        if(patient){
            return res.json(200,{
                message:'Patient already Exist',
                patient
            });
        }
        patient=await Patient.create(req.body);
        return res.json(200,{
            message:'Patient Sucessfully Created',
            patient
        });
    } catch (error) {
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}

module.exports.createReport=async function(req,res){
    try {
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
        const doctor=await Doctor.findById(decoded._id);
        if(!doctor){
            return res.json('401',{
                message:"Doctor does not Exist"
            });
        }
        let patient=await Patient.findById(req.params.id);
        if(!patient){
            return res.json(404,{
                message:'Patient needs to register first as this Patient does not exist',
            });
        }
        let report= await Report.create({
            doctorName:doctor.name,
            patientId:patient._id,
            status:req.body.status,
        })
        patient.repots.push(report);
        patient.save();
        return res.json(200,{
            message:`${patient.name} Report is ready:-Watch It`,
            report
        })
    } catch (error) {
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}


module.exports.allReports=async function(req,res){
    try {
        const doctorJWTToken = req.headers.authorization;
        const token = doctorJWTToken.split(' ');
        const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
        const doctor=await Doctor.findById(decoded._id);
        if(!doctor){
            return res.json('401',{
                message:"Doctor does not Exist"
            });
        }
        let patient=await Patient.findById(req.params.id);
        if(!patient){
            return res.json(404,{
                message:'Patient needs to register first as this Patient does not exist',
            });
        }
        const reportArrays=patient.repots.sort({date:-1});
        return res.json(200,{
            message:`List of all ${patient.name} reports are:` ,
            reportArrays
        })
    } catch (error) {
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}
