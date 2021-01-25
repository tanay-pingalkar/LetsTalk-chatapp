import React , {useState , useEffect} from 'react';
import "./../style.css"
import { useDispatch,useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './../axios';
import loadUserData from './../reducer/action/loadUserData';
import {  faTimes} from '@fortawesome/free-solid-svg-icons';
import hit from './../reducer/action/hit';


const People=()=>{
    const dispatch=useDispatch();
    const userData=useSelector(state=>state.userData);
    const prevRoom=useSelector(state=>state.prevRoom);
    const people=useSelector(state=>state.people);
    const [peoplebull, setpeoplebull] = useState(false)
    
    useEffect(()=>{
        if(people===true){
            setpeoplebull(true);
        }
        else{
            setpeoplebull(false)
        }
    },[people])

    if(peoplebull){
        console.log("this is bro")
        return(
            <div className='addRoom'>
                <span onClick={()=>dispatch(hit('people'))}>
                    <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
                </span>
                <h1>people</h1>
            </div>
        )
    }
    else{
        return(
            <span></span>
        )
    }
}

export default People;