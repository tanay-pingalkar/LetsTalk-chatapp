import React , {useState, useEffect}from 'react';
import "./style.css"
import axios from './axios'
import {useSelector, useDispatch} from 'react-redux';
import ChangePrevRoom from './reducer/action/changePrevRoom';
import { faAngleDown , faUsers, faShare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Room=(room)=>{
    const [roomName,setit]=useState('roomName')
    const userData=useSelector(state=>state.userData);
    const prevRoom=useSelector(state=>state.prevRoom)
    const dispatch = useDispatch();
    const [rotate,setrotate]=useState({});


    //*dispatch and update in database
    const setPrev=(room)=>{
        axios.post(`/prevRoom/${userData._id}`,{
            prevRoom:room
        });
        dispatch(ChangePrevRoom(room));
    }

    useEffect(()=>{if(prevRoom===room.room){
            setit('roomClick')
            setrotate({});
        }
        else{
            setit('roomName')
        }
    },[prevRoom])
    return(
        <div>
            <div className={roomName} onClick={()=>{setPrev(room.room)}}>
                <div className='wow'>
                    <p>{room.room}</p>
                    {(roomName==='roomClick'||roomName==='tall')?(
                        <FontAwesomeIcon  icon={ faAngleDown } size='2x' className='arrow2' onClick={()=>
                            {
                                if(roomName==='tall'){
                                    setrotate({});
                                    setit('roomClick');
                                }
                                else{
                                    setit('tall');
                                    setrotate({transform:'rotatez(180deg)'})
                                }
                        }}  style={rotate}/>
                        ):(
                            <p></p>
                        )}
                    </div>
                    <div className='settings'>
                        <div class='users'>
                            <FontAwesomeIcon icon={faUsers} />
                            <p>people</p>
                        </div>
                        
                        <div class='users'onClick={(e)=>{
                            var textField = document.createElement('textarea')
                            textField.innerText = `Room Name:${prevRoom}\n http://localhost:3000/`
                            document.body.appendChild(textField)
                            textField.select()
                            document.execCommand('copy')
                            textField.remove()
                        }}>
                            <FontAwesomeIcon icon={faShare} />
                            <p>share</p>
                        </div>
                        <div class='users'>
                            <FontAwesomeIcon icon={faSignOutAlt}   className='red'/>
                            <p className='red'>leave</p>
                        </div>
                    </div>
            </div>
            
        </div>
    )
}

export default Room;