//* importing
const express= require('express');
const mongoose= require("mongoose");
const Messages= require("./msg.js");
const Pusher=   require("pusher");
const cors= require("cors");
const User= require("./db/user.js");


//*importing routers
const addRoom=require("./Router/addRoom");
const joinRoom=require("./Router/joinRoom");
const getById=require("./Router/getById");
const checkUser=require("./Router/checkUser");
const addUser=require('./Router/addUser');



//* app config
const app=express();
const PORT= process.env.PORT || 5000;
//mongodb+srv://admin:Pza8G2mWK8XCfQy7@cluster0.nvj33.mongodb.net/allDb?retryWrites=true&w=majority
const connection= 'mongodb://admin:Pza8G2mWK8XCfQy7@cluster0-shard-00-00.nvj33.mongodb.net:27017,cluster0-shard-00-01.nvj33.mongodb.net:27017,cluster0-shard-00-02.nvj33.mongodb.net:27017/allDb?ssl=true&replicaSet=atlas-vngvpu-shard-0&authSource=admin&retryWrites=true&w=majority'

//*Pusher
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
app.use('/getById', getById);
app.use('/joinRoom',joinRoom)
app.use('/addRoom', addRoom);
app.use('/checkUser',checkUser);
app.use('/addUser',addUser);


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
app.post('/send/sync',(req,res)=>{
    console.log(req.body.prevRoom)
    Messages.find({prevRoom:req.body.prevRoom},(err , data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
            
        }

    })

});


app.post('/prevRoom/:id',(req,res)=>{
    User.findOneAndUpdate({_id:req.params.id},{$set:{prevRoom:req.body.prevRoom}}, {upsert:true},  (err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    } );
})







//* listening



//!cors policy error solved
app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000/");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
//* listener



//* socketio
const server = app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
var io = require('socket.io').listen(server);
let roomN;
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('join',(room)=>{
        if(room==='none'){
            console.log('no room found');
        }
        else{
            socket.join(room);
        }
    });
    socket.on('disconnect',()=>{
        console.log('lala');
    })
    socket.on('send',(messageData)=>{
        console.log(messageData);
        Messages.create(messageData , (err , data)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(data);
            }
    
        })
        io.to(messageData.prevRoom).emit('message',{'text':messageData.text,'room':messageData.prevRoom,'userName':messageData.userName})
    })
    
});




