import React , {useState}from 'react';
import axios from './axios'
import {Link} from 'react-router-dom'
import "./style.css"



function Signin() {
  const [userName, setuserName] = useState('');
  const [userPassword, setpassword] = useState('');
  const  [wow, setwow] = useState(true);

  const post= (e)=> {
    e.preventDefault();

    axios.post('/addUser',{
      "userName": userName,
      "userPassword": userPassword
    }).then((Response)=>{
      if(Response.data==='user exist'){
        alert('this username is not available!');
      }
      else{
        setwow(false);
      }
    });
    
  }
  return (

    <div className="App">
      {(wow)?(
        <form className='form'>

          <input  onChange={(e)=>{
            let val=e.target.value;
            let rn=val.replace(/\s/g, '-');
            setuserName(rn)
          }} placeholder='username' value={userName}></input>
          <input  onChange={(e)=>setpassword(e.target.value)} placeholder='password'></input>
          <button onClick={post} type='submit' className='login'>sign in</button>
        </form>
      ):(
        <div className='form'>
          <h1 className='good'>you had succesfully signed in</h1>
          <Link to='/'><button className='login'>login</button></Link>
        </div>
        
      )}
      
      
    </div>
  );
}

export default Signin;