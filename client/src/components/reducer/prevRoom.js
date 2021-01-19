const prevRoom= (state='none', action)=>{
    switch(action.type){
        case 'ChangePrevRoom':
            return state=action.payload;
        default:
            return state;

    }
}
export default prevRoom;