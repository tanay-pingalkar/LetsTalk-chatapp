const express=require('express');
const route=express.Router()
const User= require("./../db/user.js");



route.post('/', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    User.find({userName:req.body.userName, userPassword:req.body.userPassword},(err,data)=>{
        if(data.length===0){
            res.send('error');
            console.log('error');
        }
        else{
            console.log('you are good to go');
            res.send(data);
        }
    })
});
module.exports=route;
