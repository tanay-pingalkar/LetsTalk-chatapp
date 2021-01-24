import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from '../axios';
import "../style.css";
import {useSelector , useDispatch} from 'react-redux';
import login from '../reducer/action/login'


function Login() {
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [wow, setwow] = useState(true);
  const [id, setid]= useState({});

  //redux
  const bull=useSelector(state=> state.isLogged);
  const dispatch=useDispatch();
  if(wow){
    if(bull){
       dispatch(login());
    }
  }
  const authFunc = (e) =>{
    e.preventDefault();
    axios.post('/checkUser',{
      "userName":name,
      "userPassword":password
    }).then((Response)=>{
      if(Response.data==='error'){
        alert('no user found sign in please');
      }
      else{
        setwow(false);
        setid(Response.data[0]._id);
        dispatch(login());
      }
    });
  }
  return (
    <div className="App">
      {(wow)?(
        <div className='card'>
          <form className='form'>
            <input   placeholder='username'onChange={(e)=>{
              let val=e.target.value;
              let rn=val.replace(/\s/g, '-');
              setname(rn)
            }} ></input>
            <input onChange={(e)=>setpassword(e.target.value)} placeholder='password' type="password"></input><br></br>
            <button className='login'onClick={authFunc}type='submit'>Login</button><br></br>
            <div className='flex'>
              <p>if you dont have accout </p>
              <Link to={'/signin'}>
                <p className='signin'>  sign in  </p>
              </Link>
              <p>please</p>
            </div>
          </form>
          
        </div>
      ):(
        <div className='form'>
          <h1 className='good'>you are good to go </h1>
          <Link to={`/chat?id=${id}`}>
            <button className='start'>start chatting</button>
          </Link>
        </div>
      )}
    </div>
    
  );
}

export default Login;