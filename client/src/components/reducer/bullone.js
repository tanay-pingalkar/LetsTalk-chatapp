const bullone= (state=false, action)=>{
    switch(action.type){
        case 'addRoom':
            return !state;
        default:
            return state;
    }
}

export default bullone;