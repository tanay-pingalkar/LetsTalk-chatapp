const bulltwo= (state=false, action)=>{
    switch(action.type){
        case 'joinRoom':
            return !state;
        default:
            return state;
    }
}

export default bulltwo;