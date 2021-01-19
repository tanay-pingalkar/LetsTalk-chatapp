import React , {useState}from 'react';
import "./../style.css"
import loadUserData from './../reducer/action/loadUserData';
import { useDispatch} from 'react-redux';
import hit from './../reducer/action/hit';
import axios from './../axios'
import {  faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AddRoom=(props)=>{
    //!id
    const id=props.id;
    console.log(id)
    const dispatch=useDispatch();
    const [roomName, setroomName]= useState('');
    const [roomPassword, setroomPassword]= useState('');
    //! adding room request
    const postNewRoom= async(e)=>{
        e.preventDefault();
        if(roomName===''||roomPassword===''){
            alert('fill the form please')
        }
        else{
            const Response=await axios.post(`/addRoom/${id}`,{
                "roomName":roomName,
                "roomPassword":roomPassword
            })
            if(Response.data==='sorry'){
                alert('room name is already taken');
            }
            else{
                dispatch(loadUserData(Response.data));
                dispatch(hit('addRoom'))
            }
        }
        
    }
    return(
        <form className='addRoom'>
            <span onClick={()=>dispatch(hit('addRoom'))}>
                <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
            </span>
                    
            <input placeholder='room name'onChange={e=>{
                let val=e.target.value;
                let rn=val.replace(/\s/g, '-');
                setroomName(rn)
            }} value={roomName}></input><br></br>
            <input placeholder='room password' type='password'onChange={e=>setroomPassword(e.target.value)}></input><br></br>
            <button onClick={postNewRoom} type='submit'>add</button>
        </form>
    )
}

export default AddRoom