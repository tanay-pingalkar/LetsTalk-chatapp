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
    else if(which==='people'){
        return{
            type:'people'
        }
    }
    else if(which==='leave'){
        return{
            type:'leave'
        }
    }
    else if(which==='share'){
        return{
            type:'share'
        }
    }
}




export  default hit;