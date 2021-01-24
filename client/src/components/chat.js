import React , {useEffect}from 'react';
import axios from './axios'
import "./style.css"
import queryString from 'query-string';
import {useSelector , useDispatch} from 'react-redux';
import loadUserData from './reducer/action/loadUserData';
import RoomChat from './chatroom/roomChat';
import Shutter from './shutter'
import ChangePrevRoom from './reducer/action/changePrevRoom'





const Chat=()=>{
    const id = queryString.parse(window.location.search).id;
    const dispatch=useDispatch()
    const bull=useSelector(state=> state.isLogged);
    useEffect(()=>{
        axios.post(`/getById/${id}`).then((Response)=>{
            dispatch(loadUserData(Response.data));
            dispatch(ChangePrevRoom(Response.data.prevRoom))
        })
        
    });



    //!first check if the user is logged in or not
    if(bull){
        return(
            <div className='bg'>
                <div class='main-div'>
                    <RoomChat />
                    <Shutter id={id}/>
                    
                </div>
            </div>
            
        )
    }
    else{
        return(
            <div>
                <span>Login please!</span>
            </div>
        )
    }
}



export default Chat;