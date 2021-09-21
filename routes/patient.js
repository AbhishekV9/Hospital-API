const passport=require('passport');//to authenticate the routes

const express=require("express");
const router=express.Router();

//required patientController
const patientController=require("../controller/patientsController");

//for registering new patient
router.post('/register',passport.authenticate('jwt',{ session:false }),patientController.registerPatient);

//for creating patient report
router.post('/:id/create_report',passport.authenticate('jwt',{ session:false }),patientController.createReport);

//for getting all the report of the patient
router.get('/:id/all_reports',passport.authenticate('jwt',{ session:false }),patientController.allReports);

module.exports=router;