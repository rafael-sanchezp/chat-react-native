import { SET_USERS } from '../ActionTypes.js'

const users = (state ={users:[]}, action) => {
    switch (action.type) {
        case SET_USERS : {
        const { users } = action;
        return Object.assign({}, state, {
            users
         }); 
        }
        default: {
              return state
        }
    }
};
export default users;