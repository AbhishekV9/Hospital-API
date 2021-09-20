const express=require("express");
const app=express();
const port=process.env.PORT || 8000;




app.use('/',require("./routes"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`)
    }

    console.log(`Server is runnig on Port: ${port}`);
});