const express=require('express');
const route=express.Router()
const User= require("./../db/user.js");



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
