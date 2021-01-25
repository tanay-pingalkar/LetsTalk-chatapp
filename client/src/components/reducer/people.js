const people= (state=false, action)=>{
    switch(action.type){
        case 'people':
            return !state;
        case 'leave':
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
        default:
            return state;
    }
}

export default people;