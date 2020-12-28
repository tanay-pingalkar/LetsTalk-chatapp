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
const PORT= process.env.PORT || 9000;
const connection= 'mongodb+srv://admin:Pza8G2mWK8XCfQy7@cluster0.nvj33.mongodb.net/allDb?retryWrites=true&w=majority'

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







//* listening
app.get('/',(req,res)=>res.status(200).send('the server is up and running'));


//!cors policy error solved
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