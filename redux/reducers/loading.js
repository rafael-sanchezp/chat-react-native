import { ACTIVATE_SCROLL, ACTIVATE_LOADING } from '../ActionTypes.js'

const loading = (state = { status: false, scroll: false }, action) => {
    switch (action.type) {
        case ACTIVATE_LOADING: {
            const { status } = action;
            return Object.assign({}, state, {
                status
            });
        }
        case ACTIVATE_SCROLL: {
            const { scroll } = action;
            return Object.assign({}, state, {
                scroll
            });
        }
        default: {
            return state
        }
    }
};
export default loading;