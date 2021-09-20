const passport=require('passport');
const jWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const Doctor=require('../models/doctors');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'Hospital'
}

passport.use(new jWTStrategy(opts,function(jwt_payload,done){
    Doctor.findById(jwt_payload._id,function(err,doctor){
        if(err){
            console.log("Error in finding Doctor from JWT:",err);
        }
        if(doctor){
           return done(null,doctor);
        }else{
            return done(null,false);
        }
    });
}));

module.exports=passport;