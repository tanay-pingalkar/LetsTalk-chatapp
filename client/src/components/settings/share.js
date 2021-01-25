import React , {useState, useEffect}from 'react';
import "./../style.css";
import { useDispatch, useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './../axios';
import loadUserData from './../reducer/action/loadUserData';
import {  faTimes} from '@fortawesome/free-solid-svg-icons';
import hit from './../reducer/action/hit';


const Share=()=>{
    const dispatch=useDispatch();
    const userData=useSelector(state=>state.userData);
    const prevRoom=useSelector(state=>state.prevRoom);
    
    const share=useSelector(state=>state.share);
    const [sharebull, setsharebull] = useState(false)
    
    useEffect(()=>{
        console.log(share);
        if(share===true){
            setsharebull(true);
        }
        else{
            setsharebull(false)
        }
    },[share])

    if(sharebull){
        console.log("this is bro")
        return(
            <div className='addRoom'>
                <span onClick={()=>dispatch(hit('share'))}>
                    <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
                </span>
                <h1>share</h1>
            </div>
        )
    }
    else{
        return(
            <span></span>
        )
    }
}

export default Share;