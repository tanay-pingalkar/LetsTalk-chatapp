import React from 'react';
import '../style.css';
import {useSelector} from 'react-redux';


const Message=({user,text,checkName})=>{
    const userName=useSelector(state=>state.userData.userName);
    return(
        <div >
            {(user!==userName)?(
                <span class={'let'}><div>from {user}</div>{text}</span>
            ):(
                <div class='left-2'><span class={'none'}>ok</span><span class={'left-1'}>{text}</span></div>
            )}
        </div>
    );

}
export default Message;