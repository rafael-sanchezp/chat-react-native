import { SET_USER, CLEAR_USER } from '../ActionTypes.js'
const session = (state = { isLogin:false}, action) => {
    switch (action.type) {
        case SET_USER: {
        const { user ,isLogin} = action;
        return Object.assign({}, state, {
            user,isLogin
         }); 
        }
        case CLEAR_USER: {
            return { user:{},isLogin :false};
        }
        default: {
              return state
        }
    }
};
export default session;