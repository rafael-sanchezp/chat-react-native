const loading = (state = {status:false }, action) => {
    switch (action.type) {
        case "ACTIVATE_LOADING" : {
        const { status } = action;
        return Object.assign({}, state, {
            status
         }); 
        }
        default: {
              return state
        }
    }
};
export default loading;