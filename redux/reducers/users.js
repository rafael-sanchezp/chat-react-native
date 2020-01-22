import { SET_USERS, SET_USERS_SEARCH } from '../ActionTypes.js'

const users = (state = { users: [], search: [] }, action) => {
    switch (action.type) {
        case SET_USERS: {
            const { users } = action;
            return Object.assign({}, state, {
                users
            });
        }
        case SET_USERS_SEARCH: {
            const { search } = action;
            return Object.assign({}, state, {
                search
            });
        }
        default: {
            return state
        }
    }
};
export default users;