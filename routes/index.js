const express=require("express");
const router=express.Router();

router.get('/', function(req, res) {
    return res.json(400, {
        message: 'Please request the correct routes! Check "https://github.com/AbhishekV9/Hospital-API/blob/master/README.md" for documentation.'
    }
)});


router.use('/doctors',require('./doctor'));
router.use('/patients',require('./patient'));
router.use('/reports',require('./report'));

module.exports=router;