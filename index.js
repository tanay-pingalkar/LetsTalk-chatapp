//* importing
const express= require('express');
const mongoose= require("mongoose");
const Messages= require("./msg.js");
const Pusher=   require("pusher");
const cors= require("cors");
const User= require("./user.js");
const Rooms= require("./rooms.js");



//* app config
const app=express();
const PORT= process.env.PORT || 9000;
const connection= 'mongodb+srv://admin:Pza8G2mWK8XCfQy7@cluster0.nvj33.mongodb.net/allDb?retryWrites=true&w=majority'

 
const pusher = new Pusher({
    appId: "1123475",
    key: "daaf1aa16c0739d32aca",
    secret: "b3f729ebc086afee0b62",
    cluster: "ap2",
    useTLS: true
});

const db= mongoose.connection;

db.once('open',()=>{
    console.log('db is connected');
    const msgcollection= db.collection('contents');
    const changeS= msgcollection.watch();

    changeS.on("change", (change)=>{
        console.log('change has occured');

        if(change.operationType==='insert'){
            console.log('ok');
            const msgDetail=change.fullDocument;
            pusher.trigger('messages','inserted',{
                name: msgDetail.name,
                msg: msgDetail.msg,
                time:msgDetail.time

            });
        }
        else{
            console.log('error');
        }
    });

});
//* middleware
app.use(express.json());
app.use(cors());


//* DB config
mongoose.connect(connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});




//* ????
app.post('/send',(req,res)=>{
    const dbmsg= req.body;
    Messages.create(dbmsg , (err , data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(
                `new msg created \n ${data}`
            );
        }

    })

});
app.get('/send/sync',(req,res)=>{
    
    Messages.find( (err , data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(
                `new msg created \n ${data}`
            );
        }

    })

})


app.post('/addUser',(req, res) =>{
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



app.post('/checkUser', (req, res) =>{
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
})

//* api routes
app.get('/',(req,res)=>res.status(200).send('the server is up and running'))
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
    
});

//* listener



//* socketio
const server = app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
var io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log('a user connected');
    
});







//* get...post....put...all magic

app.post('/getById/:id',(req , res)=>{
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


app.post('/addRoom/:id',(req , res)=>{
    Rooms.find({roomName:req.body.roomName},(err,data)=>{
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



app.post('/joinRoom/:id',(req,res)=>{
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
                });
            }
        }
    })
})


