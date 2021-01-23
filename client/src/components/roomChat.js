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
const ENDPOINT= 'http://localhost:5000/';
let socket

const RoomChat=()=>{
    //*states
    const [text, settext] = useState('ok')
    const [messages,setmessages]= useState([])
    const prevRoom=useSelector(state=> state.prevRoom);
    const userName=useSelector(state=>state.userData.userName);
    const newStyle=useSelector(state=> state.naviStyle);
    const [style, setstyle] = useState('chats');
    const [place, setplace] = useState('place');
    

    useEffect(()=>{
        if(socket!==undefined){
            socket.emit('disconnect');
            socket.off()
        }
        socket=io.connect(ENDPOINT);
        if(prevRoom!=='none'){
        socket.emit('join',prevRoom);
        }
        axios.post('/send/sync',{'prevRoom':prevRoom})
        .then((Response)=>{
            setmessages(Response.data)
        })
        socket.on('message', message => {
            setmessages(messages => [ ...messages, message ]);
        });
    },[prevRoom]);
    const send= (event)=>{
        event.preventDefault();
        socket.emit('send', {text,prevRoom,userName,});
        settext('');
    }
    useEffect(()=>{
        if(newStyle==='noStyle'){
            setstyle('thatsit');
            setplace('place2')
        }
        else{
            setstyle('chats');
            setplace('place')
        }
    },[newStyle])
    return(
        <div className='RoomChat'>
                <div class={place}>
                    <ScrollToBottom class='aoto'>
                        <div class={style}>
                            {messages.map((message, i)=><Message user={message.userName} text={message.text}/>)}
                        </div>
                    </ScrollToBottom>
                </div>
            
            
            <form className='bottom'>
                <input value={text}onChange={(e)=>{settext(e.target.value)}}></input>
                <button onClick={(e)=>{
                        if(prevRoom==='none'){
                            e.preventDefault();
                            alert("Please join or add room to chat. You don't have permission to talk here.");
                        }
                        else{
                            send(e);
                        }
                    }
                }><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></button>
            </form>
        </div>
    )
}

export default RoomChat;