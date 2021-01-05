const naviStyle= (state='navi', action)=>{
    switch(action.type){
        case 'ChangeNaviStyle':
            return state=action.payload;
        default:
            return state;
    }
}
export default naviStyle;