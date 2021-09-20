const passport=require('passport');

const express=require("express");
const router=express.Router();

const patientController=require("../controller/patientsController");

router.post('/register',passport.authenticate('jwt',{ session:false }),patientController.registerPatient);

router.post('/:id/create_report',passport.authenticate('jwt',{ session:false }),patientController.createReport);

router.get('/:id/all_reports',passport.authenticate('jwt',{ session:false }),patientController.allReports);

module.exports=router;