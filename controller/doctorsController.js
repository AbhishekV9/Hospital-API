const jwt=require('jsonwebtoken');//to decode the JWT token

//required Doctors model
const Doctor=require('../models/doctors');

//function for registering a new doctor
module.exports.registerDoctor=async function(req,res){
    try{
        let email=req.body.email;
        //finding the doctor on the basis of email
        const doctor= await Doctor.findOne({email:email})
        //checking if the doctor already exists
        if(doctor){
            return res.json(200,{
                message:"doctor already exixsts",
                doctor:doctor
            });
        }
        //if doctor does not exists then creating one
        let doctor=await Doctor.create(req.body)
        //returning the response with the doctor created    
        return res.json(200,{
            message:"Doctor registered Successfully",
            doctor
        });

    }catch(err){
        //catching errors
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}

//function for session creating of doctor on login
module.exports.createsession=async function(req,res){
  try {
        //finding doctor on the basis of email
        let doctor= await Doctor.findOne({email:req.body.email});
        //if entered password dosen't match with account's password then sending response
        if(!doctor || doctor.password !== req.body.password){
            return res.json(422,{
                message:"Invalid Username or Password"
            });
        }

        //otherwise signing in the doctor and return a token that expires in 1 hr
        return res.json(200,{
            message:"Sign_In Successfull",
            token:jwt.sign(doctor.toJSON(),'Abhishek99HospitalAPI',{ expiresIn: '3600000'})
        });
  } catch (error) {
      //catching errors
        return res.json(500,{
            message:'Internal Server Error'
        });
  }
}