import React , {useState}from 'react';
import "./../style.css"
import loadUserData from './../reducer/action/loadUserData';
import { useDispatch} from 'react-redux';
import hit from './../reducer/action/hit';
import axios from './../axios'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const JoinRoom=(props)=>{
    //*redux 
    const dispatch=useDispatch();
    
    //!id
    const id=props.id;


    const [roomName, setroomName]= useState('');
    const [roomPassword, setroomPassword]= useState('');

    //!joining room reqests
    const joinNewRoom= async(e)=>{
        e.preventDefault();
        if(roomName===''||roomPassword===''){
            alert('fill the form please')
        }
        else{
            const Response=await axios.post(`/joinRoom/${id}`,{
                "roomName":roomName,
                "roomPassword":roomPassword
            })

            if(Response.data==='sorry'){
                alert('incorect username or password');
            }
            else if(Response.data==='no'){
                alert('you had already joined this room')
            }
            else{
                dispatch(loadUserData(Response.data));
                dispatch(hit('joinRoom'))
            }
        }
        
    }
    return(
        <form className='addRoom'>
            <span onClick={()=>dispatch(hit('joinRoom'))}>
                <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
            </span>
            <input onChange={e=>setroomName(e.target.value)}></input><br></br>
            <input onChange={e=>setroomPassword(e.target.value)}></input><br></br>
            <button onClick={joinNewRoom} type='submit'>join</button>
        </form>
    )
}
export default JoinRoom;


