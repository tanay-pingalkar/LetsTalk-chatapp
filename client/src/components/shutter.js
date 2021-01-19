import React , {useState}from 'react';
import "./style.css"
import {useSelector, useDispatch} from 'react-redux';
import { faAngleDown , faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cdate from './date.js';
import axios from './axios';
import Room from './room.js';



//!actions imported
import JoinRoom from './room-config/joinRoom';
import AddRoom from './room-config/addRoom';
import hit from './reducer/action/hit';
import ChangePrevRoom from './reducer/action/changePrevRoom';
import changeNaviStyle from './reducer/action/changeNaviStyle';


const Shutter=(props)=>{
    //*Redux
    const userData=useSelector(state=>state.userData);
    const bullone=useSelector(state=>state.bullone);
    const bulltwo=useSelector(state=>state.bulltwo);
    const prevRoom=useSelector(state=>state.prevRoom)
    const NaviStyle=useSelector(state=>state.naviStyle)
    const dispatch = useDispatch();
    const [bottomNavi, setBNstyle] = useState('bottom-navi');


    return(
        <div className='bandit'>
            <div className={NaviStyle}>
                <div className='rooms-con'>
                    <div>
                        <h4 className='rooms-add' onClick={()=>dispatch(hit('joinRoom'))}>Join room</h4>
                        <h4 className='rooms-add' onClick={()=>dispatch(hit('addRoom'))}>+</h4>
                    </div>
                        
                    <Cdate />
                        
                </div>
                <div className='roomTab'>
                    {userData.roomsJoined.map((room, i) =><Room room={room} />)}
                </div>
                <div className='room'>Room</div>
                <span className={bottomNavi}>
                    <h4>{userData.userName}</h4>
                    <div className='angle-down'>
                        <FontAwesomeIcon onClick={()=>{ 
                            if(NaviStyle==='navi'){
                                dispatch(changeNaviStyle('navi-full'));
                                setBNstyle('bottom-navi-two')
                            }
                            else{
                                dispatch(changeNaviStyle('navi'));
                            }
                             
                        }} icon={ faAngleDown } size='2x' className='arrow'/>
                        <FontAwesomeIcon onClick={()=>{ 
                            if(NaviStyle==='navi-full'){
                                dispatch(changeNaviStyle('navi'));
                                setBNstyle('bottom-navi')
                            }
                            else{
                                dispatch(changeNaviStyle('noStyle'));
                            }
                            }}   icon={ faAngleUp } size='2x' className='arrow'/>
                    </div>
                    <h4>{prevRoom}</h4>
                </span>
            </div>
            {(bullone)?(
                <AddRoom id={props.id}/>
            ):(<span></span>)}
            {(bulltwo)?(
                <JoinRoom id={props.id}/>
            ):(<span></span>)}
        </div>
    )
}
export default Shutter;