const express=require('express');
const route=express.Router()
const Rooms= require("./../db/rooms.js");
const User= require("./../db/user.js");

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
                            const name=data.userName;
                            Rooms.findOne({roomName:req.body.roomName},(err,data)=>{
                                if(err){
                                    res.send(err);
                                }
                                else{
                                    let peoples=data.people;
                                    peoples.unshift(name)
                                    Rooms.findOneAndUpdate({roomName:req.body.roomName},{$set:{people:peoples}},{upsert:true},(err,data)=>{
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            console.log(data)
                                        }
                                    })
                                }
                            })
                            rooms.unshift(req.body.roomName);
                            User.findOneAndUpdate({_id:req.params.id},{$set:{roomsJoined:rooms}}, {upsert:true},  (err,data)=>{
                                if(err){
                                    console.log('ok')
                                }
                                else{
                                    let roomInfo=data;
                                    roomInfo.roomsJoined.unshift(req.body.roomName)
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