const Doctor=require('../models/doctors');

module.exports.registerDoctor=async function(req,res){
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
    })
}