import React from 'react';
import './style.css';

//!date
let today = new Date();
let dd = today.getDate();

let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;
console.log(today);


const Cdate=()=>{
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = mm+'/'+dd+'/'+yyyy;
    console.log(today);
    return(
        <div>
            <h4>{today}</h4>
        </div>
    )
}

export default Cdate;
