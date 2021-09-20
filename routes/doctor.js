const express=require("express");
const router=express.Router();

const doctorController=require('../controller/doctorsController');

router.post('/register',doctorController.registerDoctor);
router.get('/login',doctorController.createsession);
module.exports=router;