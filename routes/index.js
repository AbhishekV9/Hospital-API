const express=require("express");
const router=express.Router();

//response for '/' route
router.get('/', function(req, res) {
    return res.json(400, {
        message: 'Please request the correct routes! Check "https://github.com/AbhishekV9/Hospital-API/blob/master/README.md" for documentation.'
    }
)});

//routes to all doctors request
router.use('/doctors',require('./doctor'));

//routes to all patients request
router.use('/patients',require('./patient'));

//routes to all reports request
router.use('/reports',require('./report'));

module.exports=router;