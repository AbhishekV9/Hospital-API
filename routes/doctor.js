const express=require("express");
const router=express.Router();

//required doctorController
const doctorController=require('../controller/doctorsController');

//for registering new doctor
router.post('/register',doctorController.registerDoctor);

//for session creation of doctor i.e login session
router.get('/login',doctorController.createsession);

module.exports=router;