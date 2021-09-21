const jwt=require('jsonwebtoken');

const Doctor=require('../models/doctors');
const Report=require('../models/report');

module.exports.reports=async function(req,res){
   
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
        let reports=await Report.find({status:req.params.status});
        if(!reports){
            return res.json('401',{
                message:"Report with given status does not exist"
            });
        }
        return res.json(200,{
            message:'All the reports according to the provided status are:-' ,
            reports
        })

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}