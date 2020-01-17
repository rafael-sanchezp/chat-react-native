import { SET_SESSION, CLEAR_SESION } from '../ActionTypes.js'
const session = (state = { }, action) => {
    switch (action.type) {
        case "SET_USER": {
        const { user } = action;
        return Object.assign({}, state, {
            user
         }); 
        }
        case "CLEAR_USER": {
            return { };
        }
        default: {
              return state
        }
    }
};
export default session;