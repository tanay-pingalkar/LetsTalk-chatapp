const hit=(which)=>{ 
    if(which==='joinRoom'){
        return{
            type:'joinRoom'
        }
    }
    else if(which==='addRoom'){
        return{
            type:'addRoom'
        }
    }
}




export  default hit;