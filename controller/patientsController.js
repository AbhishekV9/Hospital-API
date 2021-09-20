const jwt=require('jsonwebtoken');

const Patient=require('../models/patient');
const Doctor=require('../models/doctors');

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
        
    }
}