import {combineReducers} from 'redux';
import isLogged from './isLogged';
import userData from './userData';
import bullone from './bullone';
import bulltwo from './bulltwo';
import prevRoom from './prevRoom';


const allReducer= combineReducers({
    isLogged: isLogged,
    userData:userData,
    bullone:bullone,
    bulltwo:bulltwo,
    prevRoom:prevRoom
});

export default allReducer;