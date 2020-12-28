const express=require('express');
const route=express.Router()
const User= require("./../db/user.js");


route.post('/',(req, res) =>{
    const user= req.body;
    User.find({userName:req.body.userName},(err,data)=>{
        if(data.length===0){
            User.create(user , (err , data)=>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.status(201).send(
                        `new msg created \n ${data}`
                    );
                }
        
            });
        }
        else{
            console.log('user exist');
            res.send('user exist');
        }
    })
});




module.exports=route;
