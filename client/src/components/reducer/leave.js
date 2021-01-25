const leave= (state=false, action)=>{
    switch(action.type){
        case 'leave':
            return !state;
        case 'people':
            if(state===true){
                return !state;
            };
        case 'share':
            if(state===true){
                return !state;
            };
        case 'addRoom':
            if(state===true){
                return !state;
            }
        case 'joinRoom':
            if(state===true){
                return !state;
            }
        default:
            return state;
        
    }
}

export default leave;