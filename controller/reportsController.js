const Report = require('../models/report');
const Reports=require('../models/report');

module.exports.reports=async function(req,res){
    const doctorJWTToken = req.headers.authorization;
    const token = doctorJWTToken.split(' ');
    const decoded = jwt.verify(token[1], 'Abhishek99HospitalAPI');
    try {
        const doctor=await Doctor.findById(decoded._id);
        if(!doctor){
            return res.json('401',{
                message:"Doctor does not Exist"
            });
        }
        let reports=Report.find({status:req.params.status});
        return res.json(200,{
            message:'All the reports according to the provided status are:-' ,
            reports:reports
        })

    } catch (error) {
        return res.json(500,{
            message:'Internal Server Error'
        });
    }
}