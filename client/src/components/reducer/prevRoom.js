const prevRoom= (state='', action)=>{
    switch(action.type){
        case 'ChangePrevRoom':
            return state=action.payload;
        default:
            return state='none';
    }
}
export default prevRoom;