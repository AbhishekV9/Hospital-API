const express=require("express");
const router=express.Router();
const passport=require('passport');//to authenticate the routes

//required reportController
const reportController=require('../controller/reportsController');

//to get all the reports acording to the given status
router.get('/:status',passport.authenticate('jwt',{ session:false }),reportController.reports);

module.exports=router;