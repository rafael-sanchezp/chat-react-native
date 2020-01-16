import { SET_SESSION, CLEAR_SESION } from '../ActionTypes.js'
const session = (state = { }, action) => {
    switch (action.type) {
        case SET_SESSION : {
        const { user } = action;
        return Object.assign({}, state, {
            user:user
         }); 
        }
        case CLEAR_SESION: {
            return { };
        }
        default: {
              return state
        }
    }
};
export default session;