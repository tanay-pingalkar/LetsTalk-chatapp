const express=require('express');
const route=express.Router()
const Rooms= require("./../db/rooms.js");
const User= require("./../db/user.js");

route.post('/:id',(req,res)=>{
    Rooms.find({roomName:req.body.roomName, roomPassword:req.body.roomPassword},(err,data)=>{
        if(err){
            res.send(err);
            console.log(err);
        }
        else{
            if(data.length===0){
                res.send('sorry');
            }
            else{
                User.findById({_id:req.params.id},(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(data.roomsJoined.includes(req.body.roomName)){
                            res.send('no');
                        }
                        else{
                            const rooms=data.roomsJoined;
                            rooms.push(req.body.roomName);
                            User.findOneAndUpdate({_id:req.params.id},{$set:{roomsJoined:rooms}}, {upsert:true},  (err,data)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    let roomInfo=data;
                                    roomInfo.roomsJoined.push(req.body.roomName)
                                    res.send(roomInfo)
                                }
                            } );
                        }
                    }
                });
            }
        }
    })
});

module.exports=route;