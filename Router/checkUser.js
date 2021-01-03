const express=require('express');
const route=express.Router()
const User= require("./../db/user.js");

route.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"https://5ff18f9bdc7e5897b7feb5a2--wowchatapp.netlify.app/");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

route.post('/', (req, res) =>{
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
