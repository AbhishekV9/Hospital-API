const express=require("express");
const app=express();
const port=process.env.PORT || 8000;

const passport=require('passport');
const passportJWT=require('./config/passport-jwt-strategy');

const db=require("./config/mongoose");

app.use(express.urlencoded());


app.use('/',require("./routes"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`)
    }

    console.log(`Server is runnig on Port: ${port}`);
});