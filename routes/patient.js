const passport=require('passport');

const express=require("express");
const router=express.Router();

const patientController=require("../controller/patientsController");

router.post('/register',passport.authenticate('jwt',{ session:false }),patientController.registerPatient);

router.post('/:id/create_report',passport.authenticate('jwt',{ session:false }),patientController.createReport);

module.exports=router;