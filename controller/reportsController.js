const jwt=require('jsonwebtoken');//to decode the JWT token

const Doctor=require('../models/doctors');//Doctor's model
const Report=require('../models/report');//Report's model

module.exports.reports=async function(req,res){
   
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
        //finding reports on the basis of the status
        let reports=await Report.find({status:req.params.status});
        //if no reports are there on provided status then returning a response
        if(reports.length===0){
            return res.json('401',{
                message:"Report with given status does not exist"
            });
        }
        //otherwise returning all the reports that have been found
        return res.json(200,{
            message:'All the reports according to the provided status are:-' ,
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