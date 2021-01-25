const share= (state=false, action)=>{
    switch(action.type){
        case 'share':
            return !state;
        case 'people':
            if(state===true){
                return !state;
            };
        case 'leave':
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

export default share;