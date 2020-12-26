const express=require('express');
const route=express.Router()
const Rooms= require("./../db/rooms.js");
const User= require("./../db/user.js");

route.post('/:id',(req , res)=>{
    const id= req.params.id;
    User.findById(id , (err , data)=>{
        if(err){
            res.send('dont try to hack')
        }
        else{
            console.log(data);
            res.send(data);
        }
    })
});

module.exports=route;