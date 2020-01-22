import { MESSAGES,ADD_MESSAGES } from '../ActionTypes.js'

const messages = (state = {}, action) => {
    switch (action.type) {
        case MESSAGES: {
            const { data } = action;
            return Object.assign({}, state, {
                messages:data.messages,
                user:data.user
            });
        }
        case ADD_MESSAGES: {
            const { data } = action;
            return Object.assign({}, state, {
                messages:[...state.messages, data]
            });
        }
        default: {
            return state
        }
    }
};
export default messages;