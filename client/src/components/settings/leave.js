import React , {useState , useEffect} from 'react';
import "./../style.css"
import { useDispatch,useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './../axios';
import loadUserData from './../reducer/action/loadUserData';
import {  faTimes} from '@fortawesome/free-solid-svg-icons';
import hit from './../reducer/action/hit';



const Leave=()=>{
    const dispatch=useDispatch();
    const userData=useSelector(state=>state.userData);
    const prevRoom=useSelector(state=>state.prevRoom);
    const leave=useSelector(state=>state.leave);
    const [leavebull, setleavebull] = useState(false)
    
    useEffect(()=>{
        console.log(leave);
        if(leave===true){
            setleavebull(true);
        }
        else{
            setleavebull(false)
        }
    },[leave])

    if(leavebull){
        console.log("this is bro")
        return(
            <div className='addRoom'>
                <span onClick={()=>dispatch(hit('leave'))}>
                    <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
                </span>
                <h1>leave</h1>
            </div>
            
        )
    }
    else{
        return(
            <span></span>
        )
    }
}

export default Leave