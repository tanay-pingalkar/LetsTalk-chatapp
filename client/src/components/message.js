import React from 'react';
import './style.css';
import {useSelector} from 'react-redux';


const Message=({user,text,checkName})=>{
    const userName=useSelector(state=>state.userData.userName);
    return(
        <div >
            {(user!==userName)?(
                <p class={'let'}><div>from {user}</div>{text}</p>
            ):(
                <div class='left-2'><p class={'none'}>ok</p><p class={'left-1'}>{text}</p></div>
            )}
        </div>
    );

}
export default Message;