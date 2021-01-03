import React , {useState,useEffect}from 'react';
import axios from './axios'
import "./style.css"
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import Message from './message';
import ScrollToBottom from 'react-scroll-to-bottom';



//! ENDPOINT and socket
const ENDPOINT= 'https://workingchatapp.herokuapp.com/';
let socket

const RoomChat=()=>{
    //*states
    const [text, settext] = useState('ok')
    const [messages,setmessages]= useState([])
    const prevRoom=useSelector(state=> state.prevRoom);
    const userName=useSelector(state=>state.userData.userName);
    
    

    useEffect(()=>{
        socket=io.connect();
        console.log(prevRoom)
        socket.emit('join',prevRoom);
        console.log(socket);
        axios.post('/send/sync',{'prevRoom':prevRoom})
        .then((Response)=>{
            setmessages(Response.data)
        })
        socket.on('message', message => {
            setmessages(messages => [ ...messages, message ]);
        });
    },[prevRoom]);
    console.log(userName);
    const send= (event)=>{
        event.preventDefault();
        socket.emit('send', {text,prevRoom,userName,});
        settext('');
    }
    console.log(messages)
    return(
        <div className='RoomChat'>
                <div class='place'>
                    <ScrollToBottom class='aoto'>
                        <div class='chats'>
                            {messages.map((message, i)=><Message user={message.userName} text={message.text}/>)}
                        </div>
                    </ScrollToBottom>
                </div>
            
            
            <form className='bottom'>
                <input value={text}onChange={(e)=>{settext(e.target.value)}}></input>
                <button onClick={(e)=>send(e)}><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button>
            </form>
        </div>
    )
}

export default RoomChat;