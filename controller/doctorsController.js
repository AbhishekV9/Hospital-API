const Doctor=require('../models/doctors');
const jwt=require('jsonwebtoken');

module.exports.registerDoctor=async function(req,res){
    try{
        let email=req.body.email;
        const doctor= await Doctor.findOne({email:email})
        if(doctor){
            return res.json(200,{
                message:"doctor already exixsts",
                doctor:doctor
            })
        }
    
        Doctor.create(req.body,function(err,doctor){
            if(err){
                console.log(err);
                return res.json(500,{
                    message:'Internal Server Error'
                })
            }
            return res.json(200,{
                message:"Doctor registered Successfully",
                doctor:doctor
            })
        });
    }catch(err){
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}


module.exports.createsession=async function(req,res){
    let doctor= await Doctor.findOne({email:req.body.email});

    if(!doctor || doctor.password !== req.body.password){
        return res.json(422,{
            message:"Invalid Username or Password"
        })
    }

    return res.json(200,{
        message:"Sign_In Successfull",
        token:jwt.sign(doctor.toJSON(),'Abhishek99HospitalAPI',{ expiresIn: '1000000'})
    })
}