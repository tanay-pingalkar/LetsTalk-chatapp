//* importing
import express from "express";
import mongoose from "mongoose"
import Messages from "./msg.js";
import Pusher from "pusher";
import cors from "cors";
import User from "./user.js";



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
            res.send('ok');
        }
    })
})

//* api routes
app.get('/',(req,res)=>res.status(200).send('the server is up and running'))


//* listener
app.listen(PORT,()=>console.log(`listening on port ${PORT}`));