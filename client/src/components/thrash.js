function Chat() {
    const id = queryString.parse(window.location.search).id;
    //const [userDat, setuserData] = useState({roomsJoined:["loading..."]});
    const [roomName, setroomName]= useState('');
    const [roomPassword, setroomPassword]= useState('');
    
    //* redux
    const bull=useSelector(state=> state.isLogged);
    const userData=useSelector(state=>state.userData);
    const bullone=useSelector(state=>state.bullone);
    const bulltwo=useSelector(state=>state.bulltwo);
    const dispatch=useDispatch();

    //* style variable
    const [NaviStyle, setNaviStyle] = useState('navi');
    const [bottomNavi, setBNstyle] = useState('bottom-navi');


    useEffect(()=>{
        socket=io.connect(ENDPOINT);
        console.log(socket)
        axios.post(`/getById/${id}`).then((Response)=>{
            dispatch(loadUserData(Response.data));
        })
        
    },[ENDPOINT]);
    //* consoling area
    

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
                dispatch(hit())
            }
        }
        
    }
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
                dispatch(hit())
            }
        }
        
    }

    if(bull){
    return(
        <div className='bg'>
            
            <div className='main-div'>
                <div className={NaviStyle}>
                    <div className='rooms-con'>
                       <div>
                            <h4 className='rooms-add' onClick={()=>dispatch(hit())}>Join room</h4>
                            <h4 className='rooms-add' onClick={()=>dispatch(hit())}>+</h4>
                       </div>
                       
                       <Cdate />
                       
                    </div>
                    <div className='roomTab'>
                        {userData.roomsJoined.map((room, i) =><p className="roomName">{room}</p>)}
                    </div>
                    
                    <div className='room'>Room</div>
                    
                    
                    <span className={bottomNavi}>
                        <h4>{userData.userName}</h4>
                        <div className='angle-down'>
                            <FontAwesomeIcon onClick={()=>{ setNaviStyle('navi-full'); setBNstyle('bottom-navi-two')}} icon={ faAngleDown } size='2x' className='arrow'/>
                            <FontAwesomeIcon onClick={()=>{setNaviStyle('navi'); setBNstyle('bottom-navi')}}   icon={ faAngleUp } size='2x' className='arrow'/>
                        </div>
                        <h4>active</h4>
                    </span>
                </div>
            </div>
            {(bullone)?(
                <form className='addRoom'>
                    <span onClick={()=>dispatch(hit())}>
                        <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
                    </span>
                    
                    <input onChange={e=>setroomName(e.target.value)}></input><br></br>
                    <input onChange={e=>setroomPassword(e.target.value)}></input><br></br>
                    <button onClick={postNewRoom} type='submit'>add</button>
                </form>
            ):(<span></span>)}
            {(bulltwo)?(
                <form className='addRoom'>
                    <span onClick={()=>dispatch(hit())}>
                        <FontAwesomeIcon icon={faTimes} size='1x'/><br></br>
                    </span>
                    
                    <input onChange={e=>setroomName(e.target.value)}></input><br></br>
                    <input onChange={e=>setroomPassword(e.target.value)}></input><br></br>
                    <button onClick={joinNewRoom} type='submit'>add</button>
                </form>
            ):(<span></span>)}

            
            
        </div>
        
    );
    }
    else{
        return(
            <div>
                <span>Login please!</span>
            </div>
        )
    }
}
