const express=require('express');
const route=express.Router()
const Rooms= require("./../db/rooms.js");
const User= require("./../db/user.js");

route.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://5ff18f9bdc7e5897b7feb5a2--wowchatapp.netlify.app/');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
route.post('/:id',(req , res)=>{
    Rooms.find({roomName:req.body.roomName},(err,data)=>{
        console.log(req.params.id)
        if(data.length===0){
            Rooms.create(req.body,(err,data)=>{
                if(err){
                    console.log(err);
                    res.send(err);
                    
                }
                else{
                    User.findById({_id:req.params.id},(err,data)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            const rooms=data.roomsJoined;
                            rooms.push(req.body.roomName);
                            User.findOneAndUpdate({_id:req.params.id},{$set:{roomsJoined:rooms}}, {upsert:true},  (err,data)=>{
                                if(err){
                                    console.log('ok')
                                }
                                else{
                                    let roomInfo=data;
                                    roomInfo.roomsJoined.push(req.body.roomName)
                                    res.send(roomInfo)
                                }
                            } );
                        }
                    })
                    
                }
            })
        }
        else{
            console.log("room name is already taken");
            res.send('sorry');
        }
    })
});


module.exports = route;