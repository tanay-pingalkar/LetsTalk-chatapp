const prevRoom= (state='', action)=>{
    switch(action.type){
        case 'ChangePrevRoom':
            return state=action.payload;
        case 'ChangeNaviStyle':
            return state;
        case 'joinRoom':
            return state;
        case 'addRoom':
            return state;
        default:
            return state='none';
    }
}
export default prevRoom;