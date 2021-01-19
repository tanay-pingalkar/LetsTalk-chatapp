import React , {useState, useEffect}from 'react';
import "./style.css"
import axios from './axios'
import {useSelector, useDispatch} from 'react-redux';
import ChangePrevRoom from './reducer/action/changePrevRoom';
import { faAngleDown , faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Room=(room)=>{
    const [roomName,setit]=useState('roomName')
    const userData=useSelector(state=>state.userData);
    const prevRoom=useSelector(state=>state.prevRoom)
    const dispatch = useDispatch();
    //*dispatch and update in database
    const setPrev=(room)=>{
        axios.post(`/prevRoom/${userData._id}`,{
            prevRoom:room
        });
        dispatch(ChangePrevRoom(room));
    }

    useEffect(()=>{if(prevRoom===room.room){
            setit('roomClick')
        }
        else{
            setit('roomName')
        }
    },[prevRoom])
    return(
        <div>
            <div className={roomName} onClick={()=>{setPrev(room.room)}}>
                <p>{room.room}</p>
                {(roomName==='roomClick')?(
                    <FontAwesomeIcon  icon={ faAngleDown } size='2x' className='arrow2'/>
                ):(
                    <p></p>
                )}
            </div>
            
        </div>
    )
}

export default Room;